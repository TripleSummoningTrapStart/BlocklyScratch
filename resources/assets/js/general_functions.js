var blocklyArea;
var blocklyDiv;
var workspace;
var highlightPause = false;
var interpreter;
var time = 1;
var mouseX;
var mouseY;
//var store = new Lawnchair({adaptor:'dom', table:'people'}, function(){});

/* Method called when a change is detected in the page to resize the blockly area */
var resizeBlockly = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
	//svgArea.style.height = blocklyArea.offsetHeight + 'px';
};
/* Method to inject blockly over the blockly area from the blockly div */
var injectBlockly = function() {
  blocklyArea = document.getElementById('blocklyArea');
  blocklyDiv = document.getElementById('blocklyDiv');
  workspace = Blockly.inject('blocklyDiv',
      {media: 'blockly/media/',
		  toolbox: document.getElementById('toolbox')});

  //Local storage set up
  window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  BlocklyStorage.backupOnUnload();
  //Some block initialization including setting the highlight block prefix
  //and creating the hat curve
  Blockly.BlockSvg.START_HAT = true;
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
	Blockly.JavaScript.addReservedWords('code');

  //Adds the listener for resizing
  window.addEventListener('resize', resizeBlockly, false);
  resizeBlockly();
};

/*Method to allow the user to download their blockly code as javascript
  remove the prefixes to create clean javascript free of extra blockly code */
var downloadCode = function() {
	Blockly.JavaScript.STATEMENT_PREFIX = null;
	var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('btnCode').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(code);
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
	return code;
};
/* Method to allow the user to export their blockly code into XML that can be imported later for
   continuous work */
var exportXML = function() {
	var xml = Blockly.Xml.workspaceToDom(workspace);
	var xml_text = Blockly.Xml.domToText(xml);

	document.getElementById('btnExportXML').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml_text);
	return xml;
};

/* Method to convert text into xml and add them to the workspace */
var importXML = function(contents) {
  workspace.clear();
	var xml = Blockly.Xml.textToDom(contents);
	Blockly.Xml.domToWorkspace(workspace, xml);
};
/* Method to allow the user to open an XML file onto their computer to
	add blocks into the blockly area */
var openImportFile = function(evt) {
	if (window.File && window.FileReader && window.FileList) {
		var files = evt.target.files;
		var file = files[0];
		if (file) {
			var reader = new FileReader();
			reader.onload = function(e)
			{
        var importType = e.target.result.substring(1,4);

        switch(importType)
        {
          case 'xml':
            importXML(e.target.result);
            break;
          case 'svg':
            importSVG(e.target.result, true);
            break;
        }

			};
			reader.readAsText(file);
		}
	} else {
		alert('The File APIs are not fully supported by your browser.');
	}

};

/* Method to convert the normal javascript into function based javascript to allow
   for simulated asyncronously running code to account for multiple different hat blocks */
var generateInterpreterCode = function(codeToParse) {
	//Ensures the function code is reset
	resetFuncCode();

	//Parses the text into an array clean of comment values used as markers
	var values = cleanValues(codeToParse);
	var code = 'var queue = [];\n';
	code = "var sprite = '" + bigCircle.attr("id") + "';\n" + code; // TODO remove this and make dynamic

	// Gets all global values
	if(S(values[0]).contains('var'))
	{
		code += values[0];
	}

	// Start at 1 to skip first element which contains global values or is empty
	for(var i = 1; i < values.length; i++)
	{
		code += 'var function' + i + ' = function() {\n' + values[i] + '};\n';
		code += 'queue.push(function' + i + ');\n';
	}

	code += 'while (queue.length > 0) {\n var func = queue.shift();\n func(); \n}';

	return code;
};

/* Method to return an array of functions and other values that are ready to be put into the code
   that will be pased into the interpreter */
var cleanValues = function(codeToParse) {
	var values = codeToParse.split('// hat');
	var numOfLoops = 0;
	for(var i = 1; i < values.length; i++)
	{
		var lines = S(values[i]).lines();

		for(var k = 0; k < lines.length; k++)
		{
			if(!S(lines[k]).contains('}') && S(lines[k]).contains('//') && S(lines[k]).contains('loop'))
			{
				numOfLoops++;
			}
			lines[k]= lines[k].trim();
		}
		lines.shift();
		lines.pop();
		var startingLoopNumber = (numOfLoops*(i-1));

			var hasLoop = lookForLoop(lines, startingLoopNumber -1, 0);
			if(hasLoop > -1)
			{
			values[i] = getFuncCode();
			resetFuncCode();
			values[i] += 'queue.push(functionLoop' + startingLoopNumber + ');\n';
			}

	}

	return values;
};
/* Method that allows their user to step through their code */
var stepCode = function () {
	if(interpreter == null)
	{
		var code = generateInterpreterCode(Blockly.JavaScript.workspaceToCode(workspace));
		interpreter = new Interpreter(code, initApi);
		workspace.traceOn(true);
		highlightPause = false;
	}
	try {
		var ok = interpreter.step();
	} finally {
		if (!ok) {
			// Program complete, no more code to execute.
			interpreter = null;
			return;
		}
	}
	if (highlightPause) {
		// A block has been highlighted.  Pause execution here.
		highlightPause = false;
	} else {
		// Keep executing until a highlight statement is reached.
		stepCode();
	}

};
/* Method to step through the interpreter */
function nextStep() {
	if (interpreter.step()) {
		window.setTimeout(nextStep, 0);
	}
	else
	{
		interpreter = null;
	}
};
/* Method to stop code execution */
var stopCode = function() {
	workspace.highlightBlock(null);
	interpreter = null;
};
/* Method to run the blockly code as javascript on the page by injecting it into the intpreter */
var runCode = function() {
	Blockly.JavaScript.STATEMENT_PREFIX = null;
	var code = generateInterpreterCode(Blockly.JavaScript.workspaceToCode(workspace));
	interpreter = new Interpreter(code, initApi);
	nextStep();
	Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
};
var timer = function()
{
	var textarea = document.getElementById("textArea");
	textarea.innerHTML += time + '&#13;&#10;';
	textarea.scrollTop = textarea.scrollHeight;
	time++;
	window.setTimeout(timer, 1000);
}
/*Method to add event listeners to the buttons on the page */
var registerButtons = function() {
	document.getElementById('xmlFile').addEventListener('change', openImportFile, false);
	document.getElementById('btnRun').addEventListener('click', runCode, false);
	document.getElementById('btnStep').addEventListener('click', stepCode, false);
	document.getElementById('btnStop').addEventListener('click', stopCode, false);
	document.getElementById('btnCode').addEventListener('click', downloadCode, false);
	document.getElementById('btnExportXML').addEventListener('click', exportXML, false);
  document.getElementById('svgFile').addEventListener('change', openImportFile, false);
};

/* Method to convert the given degrees to radians
* @param degrees to be converted
*/
var convertToRadians = function(deg){
  return deg * Math.PI / 180;
};

/* Method to convert the given radians to degrees
* @param radians to be converted
*/
var convertToDegrees = function(rad){
  return rad * 180 / Math.PI;
};

/* JQuery method to track the position of the mouse */
$(document).mousemove(function(event) {
  mouseX= event.pageX;
  mouseY = event.pageY;
});

/* Method to calculate the position of the sprite in the browser window */
var calculateSpriteWindowPosition = function(spr){
  return {x: document.getElementById(spr.node.id).getBoundingClientRect().left,
          y: document.getElementById(spr.node.id).getBoundingClientRect().top};
};

/* Method to add two matrices and return the SnapSVG Matrix */
var matrixAdd = function(matrixA, matrixB)
{
  return new Snap.Matrix(matrixA.a + matrixB.a, matrixA.b + matrixB.b, matrixA.c + matrixB.c, matrixA.d + matrixB.d, matrixB.e, matrixB.f)
}

var updateStorage = function()
{

    //store.save({key: 'StageSprites'}, {StageSprites: stageList}, function(){console.log(stageList);})
  //localStorage.setItem('StageSprites',  stageList);
  //localStorage.setItem('SpriteAreaSprites', spriteList);
}
window.onload = function() {
	loadAllBlocks();
	injectBlockly();
	registerButtons();
  stage.clear();
  sprite.clear();
  addSprites();
};
