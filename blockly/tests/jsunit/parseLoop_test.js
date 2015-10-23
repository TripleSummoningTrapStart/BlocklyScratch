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
};
/*function test_1ParseStackedRepeatLoop() {
		var loopcode = ['// repeat loop',
						'for (var count = 0; count < 2; count++) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'window.alert('+');',
						'} //end loop',
						'// repeat loop',
						'for (var count2 = 0; count2 < 2; count2++) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'window.alert('+');',
						'} //end loop'];
	var expectedCode = 'var remainingCodeForLoop1 = function() {\n\n'

						'var count2 = 0;\n'
						'var functionLoop2 = function() {\n'
						'if( count2 < 2){\n'
						'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
						'window.alert('+');\n'
						'count2++;\n'
						'queue.push(functionLoop2);\n'
						'}\n'
						'};\n'

						'queue.push(functionLoop2);\n'
						'};\n'
						'var count = 0;'
						'var functionLoop1 = function() {\n'
						'if( count < 2){\n'
						'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
						'window.alert('+');\n'
						'count++;\n'
						'queue.push(functionLoop1);\n'
						'}\n'
						'else{\n'
						'queue.push(remainingCodeForLoop1);\n'
						'count = 0;\n'
						'}\n'
						'};\n'
						'queue.push(functionLoop1);\n'
						'};\n'
	lookForLoop(loopcode, 0, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
}*/
function test_1ParseStackedWhileLoop() {
	
}
function test_1ParseStackedRepeat_WhileLoop() {
	
}
function test_1ParseStackedWhile_RepeatLoop() {
	
}
function test_1ParseStackedRepeat_ForeverLoop() {
	
}
function test_1ParseStackedWhile_ForeverLoop() {
	
}