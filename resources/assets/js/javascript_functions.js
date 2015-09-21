var blocklyArea;
var blocklyDiv;
var workspace;

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
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
  window.addEventListener('resize', resizeBlockly, false);
  resizeBlockly();
 }
 var downloadCode = function()
 {
	Blockly.JavaScript.STATEMENT_PREFIX = null;
	Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	var code = Blockly.JavaScript.workspaceToCode(workspace);
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
 var importXML = function(evt)
 {
	if (window.File && window.FileReader && window.FileList) {
		var files = evt.target.files;
		var file = files[0];
		if (file) {
			var reader = new FileReader();
			reader.onload = function(e) { 
				var contents = e.target.result;
				var xml = Blockly.Xml.textToDom(contents);
				Blockly.Xml.domToWorkspace(workspace, xml);
	    	};
     		reader.readAsText(file);
     	}
	} else {
		alert('The File APIs are not fully supported by your browser.');
	}
 } 
 var runcode = function()
 {
	Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
	Blockly.JavaScript.addReservedWords('code');
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	var myInterpreter = new Interpreter(code, initApi);
    workspace.traceOn(true);
    workspace.highlightBlock(null);
	
	//steps through and executes code, the timeout is for the highlighting
    function nextStep() {
		if (myInterpreter.step()) {
		window.setTimeout(nextStep, 1);
		}
	}
	nextStep();
}

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
		return interpreter.createPrimitive(workspace.highlightBlock(id));
	}
	interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
  }
  var registerButtons = function()
  {
	document.getElementById('files').addEventListener('change', importXML, false);
	document.getElementById('btnRun').addEventListener('click', runcode, false);
	document.getElementById('btnCode').addEventListener('click', downloadCode, false);
	document.getElementById('btnExportXML').addEventListener('click', exportXML, false);
  }
   window.onload = function()
 {
	injectBlockly();
	registerButtons();
 }