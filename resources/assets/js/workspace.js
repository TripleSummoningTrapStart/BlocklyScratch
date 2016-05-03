

var Blockspace = (function(){

  var blocklyArea;
  var blocklyDiv;
  var workspace;
  var highlightPause = false;
  var interpreter;
  var mouseX;
  var mouseY;
  var textSubmitted = false;
  var downloadingCode = false; // Check for generating functions as strings for downloading code


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
    BlocklyStorage.backupOnUnload(workspace);
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
    // write outside functions
    downloadingCode = true;
  	var code = Blockly.JavaScript.workspaceToCode(workspace);
    downloadingCode = false;
    // Remove all duplicate functions
    code = parseDownloadCodeFunctions(code);
    // Write actual executed code
    code += Blockly.JavaScript.workspaceToCode(workspace);
      document.getElementById('btnCode').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(code);
      Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  	return code;
  };

  /* Method to remove duplicate functions from code that is being downloaded */
  var parseDownloadCodeFunctions = function(codeToParse) {
    var functions = codeToParse.split("// FunctionHeaderForRemovingExcess");
    if (functions.length == 1){
      return codeToParse;
    }
    else {
      var found = [];
      var i;
      if (S(functions[0]).contains("var")){
        i = 1;
      }
      else {
        i = 0;
      }
      for(; i < functions.length; i ++){
        var func = functions[i].trim();
        if (found.indexOf(func) > -1){
          continue;
        }
        else {
          found.push(func);
        }
      }
      return found.join("\n") + "\n// End of function declarations\n\n";
    }
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
  	code = "var sprite = '" + SVGAreas.myCircle.attr("id") + "';\n" + code; // TODO remove this and make dynamic

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
      resetFuncCode();
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
      window.setTimeout(nextStep,0);
    }
    else
    {
      interpreter = null;
    }
  };
  /* Method to stop code execution */
  var stopCode = function() {
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
  /*<button id="btnRun" class="btn btn-success">Run</button>
  <button id="btnStep" class="btn btn-warning">Step</button>
  <button id="btnStop" class="btn btn-danger">Stop</button>
  <a id="btnCode" href="" class="btn btn-info" download="code.js">Download Code</a>
  <a id="btnExportXML" href="" class="btn btn-info" download="blocks.xml">Download XML</a>
  <a id="btnImportXML" class="btn btn-info">Upload XML: <input type="file" style="display:inline" style="visibility: hidden" id="xmlFile" name="files[]"></a> <!--- reference: http://www.html5rocks.com/en/tutorials/file/dndfiles/ -->
  <a id="btnImportSVG" class="btn btn-info">Upload SVG: <input type="file" style="display:inline" style="visibility: hidden" id="svgFile" name="files[]"></a>*/
  var createRunButton = function(divID) {
    $('#' + divID)
    .append('<button id="btnRun" class="btn btn-success" >Run</button> ');
    	document.getElementById('btnRun').addEventListener('click', runCode, false);
  };
  var createStepButton = function(divID) {
    $('#' + divID)
    .append('<button id="btnStep" class="btn btn-warning">Step</button> ');
    document.getElementById('btnStep').addEventListener('click', stepCode, false);
  }
  var createStopButton = function(divID) {
    $('#' + divID)
    .append('<button id="btnStop" class="btn btn-danger">Stop</button> ');
    document.getElementById('btnStop').addEventListener('click', stopCode, false);

  };
  var createDownloadCodeButton = function(divID) {
    $('#' + divID)
    .append('<a id="btnCode" href="" class="btn btn-info" download="code.js">Download Code</a> ');
    document.getElementById('btnCode').addEventListener('click', downloadCode, false);
  };
  var createExportXMLButton = function(divID) {
    $('#' + divID)
    .append('<a id="btnExportXML" href="" class="btn btn-info" download="blocks.xml">Download XML</a> ');
      document.getElementById('btnExportXML').addEventListener('click', exportXML, false);
  };
  var createImportXMLButton = function(divID) {
    $('#' + divID)
    .append('<a id="btnImportXML" class="btn btn-info">Upload XML: <input type="file" style="display:inline" style="visibility: hidden" id="xmlFile" name="files[]"></a>');
      document.getElementById('xmlFile').addEventListener('change', openImportFile, false);
  };



  //document.getElementById('svgFile').addEventListener('change', openImportFile, false);
  /**
   * Created by Dominik on 11/2/2015.
   * Originally in d3 by Joshua Weese (weeser@ksu.edu)
   */

  /*Method to dynamically load the blockly blocks into a toolbox */
  function loadAllBlocks() {
      var blocks = [];
      var cats = {};
  	var invalid = ["logic_ternary", "control_repeat", "control_for", "control_forEach", "texts_prompt", "texts_create_join_container", "texts_create_join_item", "lists_create_with_container", "lists_create_with_item", "control_if_if", "control_if_elseif", "control_if_else", "procedures_mutatorcontainer", "procedures_mutatorarg","procedures_callnoreturn", "procedures_callreturn"];
      for (var block in Blockly.Blocks) {

        /* Gathers all blocks and categories */
          try {
              if (Blockly.Blocks[block].hasOwnProperty("init")&&invalid.indexOf(block)==-1) {
                  blocks.push(block);
              } else {
                  cats[block] = 0;
              }
          } catch(e) {
              console.log(e)
          }
      }

      /* Creates a section for each category in the toolbox */
      var doc_toolbox = document.getElementById('toolbox');
      for (var cat in cats) {
          var category = document.createElement("category");
          category.setAttribute("id", "cat" + cat);
          category.setAttribute("name", cat);
          if(Blockly.Blocks[cat].hasOwnProperty("HSV_HUE")
              && Blockly.Blocks[cat].hasOwnProperty("HSV_SATURATION")
              && Blockly.Blocks[cat].hasOwnProperty("HSV_VALUE")){
              category.setAttribute("colour",
                  [Blockly.Blocks[cat].HSV_HUE, Blockly.Blocks[cat].HSV_SATURATION, Blockly.Blocks[cat].HSV_VALUE]);
          }
          doc_toolbox.appendChild(category);
      }

      /* Fills the categories with the blocks in that category */
      for (var block in blocks) {
          var s = blocks[block].split('_');
          if (s.length > 0 && cats.hasOwnProperty(s[0])) {
              var parentCat = document.getElementById("cat" + s[0]);
              var blockElement = document.createElement("block");
              blockElement.setAttribute("type", blocks[block]);
              parentCat.appendChild(blockElement);
              cats[s[0]] += 1;
          } else {
              console.log(blocks[block]);
          }
      }

      /* Removes any categories with no blocks */
      for (var cat in cats) {
          if (cats[cat] === 0 || cat == "colour") {
              document.getElementById("cat" + cat).remove(); // remove() is not supported in IE
          }
      }
  }

  return{
    createRunButton: createRunButton,
    createStepButton: createStepButton,
    createStopButton: createStopButton,
    createDownloadCodeButton: createDownloadCodeButton,
    createExportXMLButton: createExportXMLButton,
    createImportXMLButton: createImportXMLButton,
    injectBlockly: injectBlockly,
    loadAllBlocks: loadAllBlocks,
    downloadingCode: downloadingCode
  };
})();
