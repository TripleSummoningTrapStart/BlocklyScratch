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
}

function test_1parseForeverLoop() {
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
}

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
	assertEquals(expectedCode, code);
}

// Nested Loop Tests
function test_1parseNested_RepeatRepeat() {
	var loopcode = ['// repeat loop',
							'for (var count2 = 0; count2 < 10; count2++) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'// repeat loop',
						'for (var count = 0; count < 10; count++) {',
							'if(--window.LoopTrap == 0) throw "Infinite loop.";',
							'window.alert('+');',
						'} //end loop',
					'} //end loop'];
	var expectedCode =  'var count2 = 0;\n'
						+ 'var functionLoop0 = function() {\n'
							+ 'if( count2 < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'count2++;\n'
								+ 'queue.push(functionLoop1);\n'
							+ '}\n};\n'
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
						+ '}\n};\n';
	parseRepeatLoop(loopcode, 0, false, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_RepeatWhile() {
	var loopcode = ['// repeat loop',
					'for (var count = 0; count < 10; count++) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'// while loop',
						'while (item < 10) {',
							'if(--window.LoopTrap == 0) throw "Infinite loop.";',
							'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;',
						'} //end loop',
					'} //end loop'];

	var expectedCode = 'var count = 0;\n'
						+ 'var functionLoop0 = function() {\n'
							+ 'if( count < 10){\n'
							+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
							+ 'count++;\n'
							+ 'queue.push(functionLoop1);\n}\n};\n'
						+ 'var functionLoop1 = function() {\n'
						+ 'if(item < 10){\n'
							+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
							+ 'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;\n'
							+ 'queue.push(functionLoop1);\n}\n'
						+ 'else{\n'
							+ 'queue.push(functionLoop0);\n}\n};\n';

	parseRepeatLoop(loopcode, 0, false, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_RepeatForever() {
	var loopcode = ['// repeat loop',
					'for (var count = 0; count < 10; count++) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";',
						'// forever loop',
						'while (true) {',
						'window.alert('+');',
						'} //end loop',
					'} //end loop'];

	var expectedCode = 'var count = 0;\n'
						+ 'var functionLoop0 = function() {\n'
							+ 'if( count < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'count++;\n'
								+ 'queue.push(functionLoop1);\n}\n};\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'window.alert('+');\n'
							+ 'queue.push(functionLoop1);\n};\n';

	parseRepeatLoop(loopcode, 0, false, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_WhileWhile() {
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

	var expectedCode = 'var functionLoop0 = function() {\n'
							+ 'if(item < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'queue.push(functionLoop1);\n}\n};\n'
						+ 'var remainingCodeForLoop1 = function() {\n'
							+ 'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;\n'
							+ 'queue.push(functionLoop0);\n};\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'if(i < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'i = (typeof i == '+'number' +' ? i : 0) + 1;\n'
								+ 'queue.push(functionLoop1);\n}\n'
							+ 'else{\n'
								+ 'queue.push(remainingCodeForLoop1);\n}\n};\n';

	parseWhileLoop(loopcode, 0, false, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_WhileRepeat() {
	var loopCode = ['// while loop',
					'while (item < 10) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";\n',
						'// repeat loop',
						'for (var count = 0; count < 10; count++) {',
							'if(--window.LoopTrap == 0) throw "Infinite loop.";',
							'window.alert('+');',
						'} //end loop',
						'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;',
					'} //end loop'];
	
	var expectedCode = 'var functionLoop0 = function() {\n'
							+ 'if(item < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n\n'
								+ 'queue.push(functionLoop1);\n}\n};\n'
						+ 'var remainingCodeForLoop1 = function() {\n'
							+ 'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;\n'
							+ 'queue.push(functionLoop0);\n};\n'
						+ 'var count = 0;\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'if( count < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'window.alert('+');\n'
								+ 'count++;\n'
								+ 'queue.push(functionLoop1);\n'
							+ '}\n'
							+ 'else{\n'
								+ 'queue.push(remainingCodeForLoop1);\n'
								+ 'count = 0;\n}\n};\n';
						
	parseWhileLoop(loopCode, 0, false, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_WhileForever() {
	var loopCode = ['// while loop',
					'while (item < 10) {',
						'if(--window.LoopTrap == 0) throw "Infinite loop.";\n',
						'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;',
						'// forever loop',
						'while (true) {',
							'window.alert('+');',
						'} //end loop',
					'} //end loop'];
					
	var expectedCode = 'var functionLoop0 = function() {\n'
							+ 'if(item < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n\n'
								+ 'item = (typeof item == ' + 'number' + ' ? item : 0) + 1;\n'
								+ 'queue.push(functionLoop1);\n}\n};\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'window.alert('+');\n'
							+ 'queue.push(functionLoop1);\n};\n';
							
	parseWhileLoop(loopCode, 0, false, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_ForeverForever() {
	var loopCode = ['// forever loop',
					'while (true) {',
						'// forever loop',
						'while (true) {',
							'window.alert('+');',
						'} //end loop',
					'} //end loop'];
					
	var expectedCode = 'var functionLoop0 = function() {\n'
							+ 'queue.push(functionLoop1);\n};\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'window.alert('+');\n'
							+ 'queue.push(functionLoop1);\n};\n';
							
	parseForeverLoop(loopCode, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_ForeverRepeat() {
	var loopCode = ['// forever loop',
					'while (true) {',
						'// repeat loop',
						'for (var count = 0; count < 10; count++) {',
							'if(--window.LoopTrap == 0) throw "Infinite loop.";',
							'window.alert('+');',
						'} //end loop',
					'} //end loop'];
					
	var expectedCode = 'var functionLoop0 = function() {\n'
							+ 'queue.push(functionLoop1);\n};\n'
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
								+ 'count = 0;\n}\n};\n';
								
	parseForeverLoop(loopCode, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

function test_1parseNested_ForeverWhile() {
	var loopCode = ['// forever loop',
					'while (true) {',
						'// while loop',
						'while (i < 10) {',
							'if(--window.LoopTrap == 0) throw "Infinite loop.";',
							'i = (typeof i == ' + 'number' + ' ? i : 0) + 1;',
						'} //end loop',
					'} //end loop'];
					
	var expectedCode = 'var functionLoop0 = function() {\n'
							+ 'queue.push(functionLoop1);\n};\n'
						+ 'var functionLoop1 = function() {\n'
							+ 'if(i < 10){\n'
								+ 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+ 'i = (typeof i == '+'number' +' ? i : 0) + 1;\n'
								+ 'queue.push(functionLoop1);\n}\n'
							+ 'else{\n'
								+ 'queue.push(functionLoop0);\n}\n};\n';
								
	parseForeverLoop(loopCode, 0);
	var code = getFuncCode();
	resetFuncCode();
	assertEquals(expectedCode, code);
}

// Stacked Loop Tests
function test_1ParseStackedRepeatLoop() {
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
	var expectedCode = 'var remainingCodeForLoop1 = function() {\n'
							+'var count2 = 0;\n'
							+'var functionLoop2 = function() {\n'
								+'if( count2 < 2){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'window.alert('+');\n'
								+'count2++;\n'
								+'queue.push(functionLoop2);\n'
								+'}\n'
							+'};\n'
							+'queue.push(functionLoop2);\n'
						+'};\n'
						+'var count = 0;\n'
						+'var functionLoop1 = function() {\n'
							+'if( count < 2){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'window.alert('+');\n'
								+'count++;\n'
								+'queue.push(functionLoop1);\n'
							+'}\n'
							+'else{\n'
								+'queue.push(remainingCodeForLoop1);\n'
								+'count = 0;\n'
							+'}\n'
						+'};\n';
	lookForLoop(loopcode, 0, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
}

function test_1ParseStackedWhileLoop() {
	var loopcode = ['// while loop',
					'while (i < 10) {',
					'if(--window.LoopTrap == 0) throw "Infinite loop.";',
					'i = (typeof i == '+ 'number' + ' ? i : 0) + 1;',
					'} //end loop',
					'window.alert('+');',
					'// while loop',
					'while (item < 10) {',
					'if(--window.LoopTrap == 0) throw "Infinite loop.";',
					  'item = (typeof item == '+ 'number' + ' ? item : 0) + 1;',
					'} //end loop'];
	var expectedCode = 'var remainingCodeForLoop1 = function() {\n'
							+'window.alert('+');\n'
							+'var functionLoop2 = function() {\n'
								+'if(item < 10){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'item = (typeof item == '+ 'number' + ' ? item : 0) + 1;\n'
								+'queue.push(functionLoop2);\n'
								+'}\n'
							+'};\n'

							+'queue.push(functionLoop2);\n'
						+'};\n'
						+'var functionLoop1 = function() {\n'
							+'if(i < 10){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'i = (typeof i == '+ 'number' + ' ? i : 0) + 1;\n'
								+'queue.push(functionLoop1);\n'
							+'}\n'
							+'else{\n'
								+'queue.push(remainingCodeForLoop1);\n'
							+'}\n'
						+'};\n';
	lookForLoop(loopcode, 0, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
}

function test_1ParseStackedRepeat_WhileLoop() {
	
	var loopcode = ['// repeat loop',
					'for (var count = 0; count < 10; count++) {',
					'if(--window.LoopTrap == 0) throw "Infinite loop.";',
					  'window.alert('+');',
					'} //end loop',
					'// while loop',
					'while (i < 10) {',
					'if(--window.LoopTrap == 0) throw "Infinite loop.";',
					  'i = (typeof i == '+'number'+' ? i : 0) + 1;',
					'} //end loop'];
	var expectedCode = 'var remainingCodeForLoop1 = function() {\n'
							+'var functionLoop2 = function() {\n'
								+'if(i < 10){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'i = (typeof i == '+ 'number' + ' ? i : 0) + 1;\n'
								+'queue.push(functionLoop2);\n'
								+'}\n'
							+'};\n'

							+'queue.push(functionLoop2);\n'
						+'};\n'
						+'var count = 0;\n'
						+'var functionLoop1 = function() {\n'
							+'if( count < 10){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'window.alert('+');\n'
								+'count++;\n'
								+'queue.push(functionLoop1);\n'
							+'}\n'
							+'else{\n'
								+'queue.push(remainingCodeForLoop1);\n'
								+'count = 0;\n'
							+'}\n'
						+'};\n'
	lookForLoop(loopcode, 0, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);

}

function test_1ParseStackedWhile_RepeatLoop() {
		var loopcode = ['// while loop',
					'while (i < 10) {',
					'if(--window.LoopTrap == 0) throw "Infinite loop.";',
					  'i = (typeof i == '+'number'+' ? i : 0) + 1;',
					'} //end loop',
					'// repeat loop',
					'for (var count = 0; count < 10; count++) {',
					'if(--window.LoopTrap == 0) throw "Infinite loop.";',
					  'window.alert('+');',
					'} //end loop'];
	var expectedCode = 'var remainingCodeForLoop1 = function() {\n'
							+'var count = 0;\n'
							+'var functionLoop2 = function() {\n'
								+'if( count < 10){\n'
									+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
									+'window.alert('+');\n'
									+'count++;\n'
									+'queue.push(functionLoop2);\n'
								+'}\n'
							+'};\n'
							+'queue.push(functionLoop2);\n'
						+'};\n'
						+'var functionLoop1 = function() {\n'
							+'if(i < 10){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'i = (typeof i == '+ 'number' + ' ? i : 0) + 1;\n'
								+'queue.push(functionLoop1);\n'
							+'}\n'
							+'else{\n'
								+'queue.push(remainingCodeForLoop1);\n'
							+'}\n'
						+'};\n';
	lookForLoop(loopcode, 0, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
}

function test_1ParseStackedRepeat_ForeverLoop() {
		var loopcode = ['// repeat loop',
					'for (var count = 0; count < 10; count++) {',
					'if(--window.LoopTrap == 0) throw "Infinite loop.";',
					  'window.alert('+');',
					'} //end loop',
					'// forever loop',
					'while (true) {',
					 'window.alert('+');',
					'} //end loop'];
	var expectedCode = 'var remainingCodeForLoop1 = function() {\n'
							+'var functionLoop2 = function() {\n'
								+'window.alert('+');\n'
								+'queue.push(functionLoop2);\n'
							+'};\n'
							+'queue.push(functionLoop2);\n'
						+'};\n'
						+'var count = 0;\n'
						+'var functionLoop1 = function() {\n'
								+'if( count < 10){\n'
									+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
									+'window.alert('+');\n'
									+'count++;\n'
									+'queue.push(functionLoop1);\n'
								+'}\n'
							+'else{\n'
								+'queue.push(remainingCodeForLoop1);\n'
								+'count = 0;\n'
							+'}\n'
						+'};\n';
	lookForLoop(loopcode, 0, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
}

function test_1ParseStackedWhile_ForeverLoop() {
	var loopcode = ['// while loop',
					'while (i < 10) {',
					'if(--window.LoopTrap == 0) throw "Infinite loop.";',
					  'i = (typeof i == '+'number'+' ? i : 0) + 1;',
					'} //end loop',
					'// forever loop',
					'while (true) {',
					 'window.alert('+');',
					'} //end loop'];
	var expectedCode = 'var remainingCodeForLoop1 = function() {\n'
							+'var functionLoop2 = function() {\n'
								+'window.alert('+');\n'
								+'queue.push(functionLoop2);\n'
							+'};\n'
							+'queue.push(functionLoop2);\n'
						+'};\n'
						+'var functionLoop1 = function() {\n'
							+'if(i < 10){\n'
								+'if(--window.LoopTrap == 0) throw "Infinite loop.";\n'
								+'i = (typeof i == '+ 'number' + ' ? i : 0) + 1;\n'
								+'queue.push(functionLoop1);\n'
							+'}\n'
							+'else{\n'
								+'queue.push(remainingCodeForLoop1);\n'
							+'}\n'
						+'};\n';
	lookForLoop(loopcode, 0, 0);

	var code = getFuncCode();
	resetFuncCode();
	assertEquals(code, expectedCode);
}
function test_1TrimAndGetLoopGuard() {
	var loop = ['// while loop',
				'while (i < 10) {',
				'if(--window.LoopTrap == 0) throw "Infinite loop.";',
				'i = (typeof i == '+'number'+' ? i : 0) + 1;',
				'} //end loop'];
	var loopGuard = trimAndGetLoopGuard(loop);
	var expectedArray = ['if(--window.LoopTrap == 0) throw "Infinite loop.";',
					  'i = (typeof i == '+'number'+' ? i : 0) + 1;'];
	assertEquals('while (i < 10) {', loopGuard);
	for(var i = 0; i < loop; i++) {
		assertEquals(loop[i], expectedArray[i]);
	}
}
function test_1GetLoopFunctionHeaderString() {
	var header = getLoopFunctionHeaderString(0);
	assertEquals('var functionLoop0 = function() {\n', header);
}
function test_1GetInnerLoopArray() {
	var loop = ['// forever loop',
					'while (true) {',
						'// forever loop',
						'while (true) {',
							'window.alert('+');',
						'} //end loop',
					'} //end loop'];
	var innerLoop = getInnerLoopArray(loop, 1);
	var expectedInner = ['// forever loop',
						'while (true) {',
							'window.alert('+');',
						'} //end loop'];
		for(var i = 0; i < innerLoop; i++) {
			assertEquals(innerLoop[i], expectedInner[i]);
		}
}
function test_1DetermineLoop() {
	var loop = ['// forever loop',
					'while (true) {',
					'} //end loop'];
	determineLoop(loop, '// forever loop', 0,0,0);
	var funcCode = getFuncCode();
	var expected = 'var functionLoop0 = function() {\n\nqueue.push(functionLoop0);\n};\n';
	resetFuncCode();
	assertEquals(funcCode, expected);
}
function test_1findStartofLoop(){
	var loop = ['asada','asadad','// forever loop',
					'while (true) {',
					'} //end loop'];
	var start = findStartOfLoop(loop);
	assertEquals(2, start);
}
function test_1GetBeforeStartOfLoop() {
	var loop = ['asada','asadad','// forever loop',
					'while (true) {',
					'} //end loop'];
	getBeforeStartOfLoop(loop);
	var funcCode = getFuncCode();
	var expectedLoop = ['// forever loop',
					'while (true) {',
					'} //end loop'];
	resetFuncCode();
	assertEquals('asada\nasadad\n', funcCode);
	for(var i = 0; i < loop; i++) {
		assertEquals(loop[i], expectedArray[i]);
	}
}