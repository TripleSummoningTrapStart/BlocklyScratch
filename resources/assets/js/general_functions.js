var blocklyArea;
var blocklyDiv;
var workspace;
var highlightPause = false;
var interpreter;
var code;

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
    blocklyDiv.style.width = (blocklyArea.offsetWidth - x) + 'px';
    blocklyDiv.style.height = (blocklyArea.offsetHeight - y) + 'px';
  };
var injectBlockly = function()
{
  blocklyArea = document.getElementById('blocklyArea');
  blocklyDiv = document.getElementById('blocklyDiv');
  workspace = Blockly.inject('blocklyDiv',
      {media: 'blockly/media/',
		  toolbox: document.getElementById('toolbox')});
   window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  BlocklyStorage.backupOnUnload();
  window.LoopTrap = 1000;
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
		Blockly.JavaScript.addReservedWords('highlightBlock');
	Blockly.JavaScript.addReservedWords('code');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
  window.addEventListener('resize', resizeBlockly, false);
  workspace.addChangeListener(compileCode);
  resizeBlockly();
 }
 var downloadCode = function()
 {
	Blockly.JavaScript.STATEMENT_PREFIX = null;
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('btnCode').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(code);
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
 }
 var exportXML = function()
 {
	var xml = Blockly.Xml.workspaceToDom(workspace);
	var xml_text = Blockly.Xml.domToText(xml);
	
	document.getElementById('btnExportXML').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml_text);
 } 
 var importXML = function(contents)
 {
	var xml = Blockly.Xml.textToDom(contents);
	Blockly.Xml.domToWorkspace(workspace, xml);
 }
var openImportFile = function(evt) 
{
	if (window.File && window.FileReader && window.FileList) {
		var files = evt.target.files;
		var file = files[0];
		if (file) {
			var reader = new FileReader();
			reader.onload = function(e)
			{
				importXML(e.target.result);
			};
			reader.readAsText(file);
		}
	} else {
		alert('The File APIs are not fully supported by your browser.');
	}
	
} 
var highlightBlock = function(id) {
	workspace.highlightBlock(id);
	highlightPause = true;
};
 var compileCode = function()
 {
	 code = Blockly.JavaScript.workspaceToCode(workspace);
	 interpreter = null;
 }
 var runCode = function()
 {
	Blockly.JavaScript.STATEMENT_PREFIX = null;
	code = Blockly.JavaScript.workspaceToCode(workspace);
	var test = generateInterpreterCode(code);
	interpreter = new Interpreter(test, initApi);
    workspace.traceOn(true);

	nextStep();
	Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
	code = Blockly.JavaScript.workspaceToCode(workspace);
}
var stepCode = function ()
{
	if(interpreter == null)
	{
		var test = generateInterpreterCode(code);
		interpreter = new Interpreter(test, initApi);
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
    
}
function nextStep() {
	if (interpreter.step()) {
		window.setTimeout(nextStep, 1);
	}
	else
	{
		interpreter = null;
	}
}
var stopCode = function(){
	workspace.highlightBlock(null);
	interpreter = null;
};

var generateInterpreterCode = function(codeToParse)
{
	funcCode = '';
	var values = cleanValues(codeToParse);
	var numHats = values.length - 1;
	var code = 'var queue = [];\n';

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

var cleanValues = function(codeToParse)
{
	var values = codeToParse.split('// hat');
	var numOfLoops = 0;
	for(var i = 1; i < values.length; i++)
	{
		
		/*var pos = values[i].lastIndexOf("highlightBlock");
		var sub = values[i].substr(pos);
		values[i + 1] = sub + values[i + 1];
		values[i] = values[i].replace(sub, "");*/
		
		var lines = S(values[i]).lines();
		
		for(var k = 0; k < lines.length; k++)
		{
			if(!S(lines[i]).contains('}') && S(lines[i]).contains('//') && S(lines[i]).contains('loop'))
			{
				numOfLoops++;
			}
			lines[k]= lines[k].trim();
		}
		lines.shift();
		lines.pop();
		var startingLoopNumber = (numOfLoops*(i-1));
		if(lookForLoop(lines, startingLoopNumber, 0))
		{
			//values[i] = lines.join('\n');
			values[i] = getCode();
			values[i] += 'queue.push(functionLoop' + (startingLoopNumber + 1) + ');\n';
		}
	}

	return values;
};


function initApi(interpreter, scope)
{
	var wrapper = function(text)
	{
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(alert(text));
	}
	interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
	wrapper = function(text){
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(prompt(text));
	};
	var wrapper = function(id)
	{
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(highlightBlock(id));
	}
	interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
}

  var registerButtons = function()
  {
	document.getElementById('files').addEventListener('change', openImportFile, false);
	document.getElementById('btnRun').addEventListener('click', runCode, false);
	document.getElementById('btnStep').addEventListener('click', stepCode, false);
	document.getElementById('btnStop').addEventListener('click', stopCode, false);
	document.getElementById('btnCode').addEventListener('click', downloadCode, false);
	document.getElementById('btnExportXML').addEventListener('click', exportXML, false);
  }
  
 window.onload = function()
 {
	injectBlockly();
	registerButtons();
	 //var arr = ["// loop\n", "while (true) {\n", "if (0 == 0) {\n", "// forever loop\n", "while (true) {\n", "window.alert('hello');\n", "}\n", "}\n", "}\n"];
	 //console.log(parseForeverLoop(arr, 0));
 }