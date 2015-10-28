  var registerButtons = function()
  {
	document.getElementById('files').addEventListener('change', test_1importXML, false);
	document.getElementById('btnRun').addEventListener('click', runCode, false);
	document.getElementById('btnStep').addEventListener('click', stepCode, false);
	document.getElementById('btnStop').addEventListener('click', stopCode, false);
	document.getElementById('btnCode').addEventListener('click', downloadCode, false);
	document.getElementById('btnExportXML').addEventListener('click', exportXML, false);
  }
function test_1downloadCode()
{
	var xml = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="procedures_hat_when_run_clicked" x="-1" y="-1"><next><block type="controls_if"><value name="IF0"><block type="logic_compare"><field name="OP">EQ</field><value name="A"><block type="math_number"><field name="NUM">0</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value></block></next></block></xml>';
	var expected = '// hat\nif (0 == 0) {\n}\n';
	Blockly.mainWorkspace.clear()
	importXML(xml);
	var code = downloadCode();
	assertEquals(code, expected);
}
function test_1exportXML()
{
	var xml_text = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="procedures_hat_when_run_clicked" x="26" y="59"><next><block type="controls_if"><value name="IF0"><block type="logic_compare"><field name="OP">EQ</field><value name="A"><block type="math_number"><field name="NUM">0</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value></block></next></block></xml>';
	importXML(xml_text);
	
	var xml2 = exportXML();
	assertEquals(xml2.nodeName, "XML");
	assertEquals(xml2.childNodes[0].nodeName, "BLOCK");
	assertEquals(xml2.childNodes[0].getAttribute("type"), "procedures_hat_when_run_clicked");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.getAttribute("type"), "controls_if");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.getAttribute("type"), "logic_compare");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.getAttribute("type"), "math_number");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.childNodes[2].firstChild.getAttribute("type"), "math_number");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.childNodes[2].firstChild.firstChild.textContent, "0");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.firstChild.textContent, "0");
	Blockly.mainWorkspace.clear();
}

	
function test_1importXML()
{
	var xml_text = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="procedures_hat_when_run_clicked" x="26" y="59"><next><block type="controls_if"><value name="IF0"><block type="logic_compare"><field name="OP">EQ</field><value name="A"><block type="math_number"><field name="NUM">0</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value></block></next></block></xml>';
	importXML(xml_text);

	var xml2 = Blockly.Xml.workspaceToDom(workspace);
	window.xml2 = xml2;

	assertEquals(xml2.nodeName, "XML");
	assertEquals(xml2.childNodes[0].nodeName, "BLOCK");
	assertEquals(xml2.childNodes[0].getAttribute("type"), "procedures_hat_when_run_clicked");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.getAttribute("type"), "controls_if");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.getAttribute("type"), "logic_compare");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.getAttribute("type"), "math_number");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.childNodes[2].firstChild.getAttribute("type"), "math_number");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.childNodes[2].firstChild.firstChild.textContent, "0");
	assertEquals(xml2.childNodes[0].firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.firstChild.textContent, "0");
	Blockly.mainWorkspace.clear();
}

