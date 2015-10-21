function test_1parseWhileLoop() {
var loopcode = ['// while loop',
				'while (item < 10) {',
				'if(--window.LoopTrap == 0) throw "Infinite loop.";',
				  'item = (typeof item == '+'number'+' ? item : 0) + 1;',
				'} //end loop'];
	var expectedCode = 'var functionLoop0 = function() {\n'
							+'if(item < 10){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'item = (typeof item == '+'number' +' ? item : 0) + 1;\n'
								+'queue.push(functionLoop0);\n}\n};\n';
	parseWhileLoop(loopcode, 0, false, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
};
function test_1parseForeverLoop() {
var loopcode = ['// forever loop',
				'while (true) {',
				  'window.alert('+');',
				'} //end loop'];
	var expectedCode = 'var functionLoop0 = function() {\n'
							+'window.alert('+');\n'
							+'queue.push(functionLoop0);\n'
						+'};\n'
	parseForeverLoop(loopcode, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
};
function test_1parseRepeatLoop() {
	var loopcode = ['// repeat loop',
				'for (var count = 0; count < 10; count++) {',
				'if(--window.LoopTrap == 0) throw "Infinite loop.";',
				  'window.alert('+');',
				'} //end loop'];
	var expectedCode = 'var count = 0;\n'
						+'var functionLoop0 = function() {\n'
							+'if( count < 10){\n'
							+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'window.alert('+');\n'
								+'count++;\n'
							+'queue.push(functionLoop0);\n}\n};\n';
	parseRepeatLoop(loopcode, 0, false, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
}