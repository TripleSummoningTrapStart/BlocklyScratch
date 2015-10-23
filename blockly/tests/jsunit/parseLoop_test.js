function test_1parseWhileLoop()
{
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
function test_1parseForeverLoop()
{
var loopcode = ['// forever loop',
				'while (true) {',
				  'window.alert('+');',
				'} //end loop'];
	var expectedCode = 'var functionLoop0 = function() {\n'
							+'window.alert('+');\n'
							+'queue.push(functionLoop0);\n'
						+'};\n';
	parseForeverLoop(loopcode, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
};
function test_1parseRepeatLoop()
{
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

// Nested Loop Tests

function test_1parseNested_RepeatRepeat()
{
	var loopcode = ['// repeat loop',
							'for (var count2 = 0; count2 < 10; count2++) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'// repeat loop',
						'for (var count = 0; count < 10; count++) {',
							'if(--window.LoopTrap == 0) throw "Infinite loop.";',
							'window.alert('+');',
						'} //end loop',
					'} //end loop'];
	var expectedCode = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
						+ 'var count = 0;\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'if( count < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'window.alert('+');\n'
								+ 'count++;\n'
								+ 'queue.push(functionLoop1);\n'
							+ '}\n'
							+ 'else{\n'
								+ 'queue.push(functionLoop0);\n'
							+ 'count = 0;\n'
						+ '}\n};\n'
						+ 'var count2 = 0;\n'
						+ 'var functionLoop0 = function() {\n'
							+ 'if( count2 < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'count2++;\n'
								+ 'queue.push(functionLoop1);\n'
							+ '}\n};\n';
	parseRepeatLoop(loopcode, 0, false, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_RepeatWhile()
{
	var loopcode = ['// repeat loop',
					'for (var count = 0; count < 10; count++) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'// while loop',
						'while (item < 10) {',
							'if(--window.LoopTrap == 0) throw "Infinite loop.";',
							'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;',
						'} //end loop',
					'} //end loop'];

	var expectedCode = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
						+ 'var functionLoop1 = function() {\n'
						+ 'if(item < 10){\n'
							+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
							+ 'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;\n'
							+ 'queue.push(functionLoop1);\n}\n'
						+ 'else{\n'
							+ 'queue.push(functionLoop0);\n}\n};\n'
						+ 'var count = 0;\n'
						+ 'var functionLoop0 = function() {\n'
						+ 'if( count < 10){\n'
							+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
							+ 'count++;\n'
							+ 'queue.push(functionLoop1);\n}\n};\n';

	parseRepeatLoop(loopcode, 0, false, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_RepeatForever()
{
	var loopcode = ['// repeat loop',
					'for (var count = 0; count < 10; count++) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'// forever loop',
						'while (true) {',
						'window.alert('+');',
						'} //end loop',
					'} //end loop'];

	var expectedCode = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'window.alert('+');\n'
						+ 'queue.push(functionLoop1);\n};\n'
						+ 'var count = 0;\n'
						+ 'var functionLoop0 = function() {\n'
							+ 'if( count < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'count++;\n'
								+ 'queue.push(functionLoop1);\n}\n};\n';

	parseRepeatLoop(loopcode, 0, false, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_WhileWhile()
{
	var loopcode = ['// while loop',
					'while (item < 10) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'// while loop',
						'while (i < 10) {',
							'if(--window.LoopTrap == 0) throw "Infinite loop.";',
							'i = (typeof i == ' + 'number' + ' ? i : 0) + 1;',
						'} //end loop',
						'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;',
					'} //end loop'];

	var expectedCode = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'if(i < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'i = (typeof i == '+'number' +' ? i : 0) + 1;\n'
								+ 'queue.push(functionLoop1);\n}\n'
							+ 'else{\n'
								+ 'queue.push(functionLoop0);\n}\n};\n'
						+ 'var functionLoop0 = function() {\n'
							+ 'if(item < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;\n'
								+ 'queue.push(functionLoop1);\n}\n};\n';

	parseWhileLoop(loopcode, 0, false, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}