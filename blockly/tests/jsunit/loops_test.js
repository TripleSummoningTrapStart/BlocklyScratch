/*function test_1forever()
{
	var s = ["// hat" , "if (0 == 0) {", "highlightBlock('276');", "window.alert('out of loop');", "}", "highlightBlock('332');", "// forever loop", "while (true) {","highlightBlock('336');","// forever loop", "while (true) {", "highlightBlock('342');","// forever loop", "while (true) {","highlightBlock('378');","if (0 == 0) {","highlightBlock('382');","window.alert('inside loop');","}","}","}","}"].join('\n');
	var t = ["var queue = [];", "var function1 = var function()P{","highlightBlock('42');","if(0==0){", "highlightBlock('276');", "window.alert('out of loop');", "}", "var functionloop1 = var function(){", "highlightBlock('332');", "var functionloop2 = var function(){", "highlightBlock('336');", "var functionloop3 = var function(){", "highlightBlock('342');", "highlightBlock('378');", 
	"if(0==0){", "highlightBlock('382')", "window.alert('inside loop');", "}", "queue.push(functionloop3);", "}", "queue.push(functionloop3);", "}", "queue.push(functionloop2);", "}", "}"].join('\n');
	//r is the value to be read in from function
	var r = parseLoop(s, 0);
	assertEquals(t, r);
}*/