function test_1downloadCode()
{
	if(downloadCode()){
		assertTrue(0==0);
	}
	else{
		assertTrue(1==0);
	}
	
}
function test_1exportXML()
{
	exportXML();
}
function test_1importXML()
{
	var xml_text = "",
		xml_text2 = "";
	//setting up workspace.
	var workspace;
	 workspace = Blockly.inject('blocklyDiv',
      {media: 'blockly/media/',
		  toolbox: document.getElementById('toolbox')});
	/*
	Load import into the blockly area.
	Do Workspace to Code to get string of current elements.
	Compare with the information in the XML File
	*/
	//fix calling importXML
	//importXML("btnImportXML");
	/*
	var event = document.defaultView.CustomEvent('load');
		event.target.files = [];
		=blocks.xml";
	*/
}