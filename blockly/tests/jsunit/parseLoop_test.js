function test_1parseWhileLoop = function()
{
var loopcode = ['// while loop',
				'while (item < 10) {',
				'if(--window.LoopTrap == 0) throw "Infinite loop.";',
				  'item = (typeof item == 'number' ? item : 0) + 1;',
				'} //end loop'];
	var expectedCode = 'var loopfunction0 = function()
						{
							if(item < 10)
							{
								if(--window.LoopTrap == 0) throw "Infinite loop.";
								item = (typeof item == 'number' ? item : 0) + 1;
								queue.push(functionLoop0);
							}
						}';
	parseWhileLoop(loopcode, 0, false, 0);
	var code = getCode();
	asserts.equal(code == expectedCode);
};
function test_1parseForeverLoop = function()
{
var loopcode = ['// forever loop',
				'while (true) {',
				  'window.alert('');',
				'} //end loop'];
	var expectedCode = 'var loopfunction0 = function(){
							window.alert('');
							queue.push(functionLoop0);
						}';
	parseForeverLoop(loopcode, 0);
	var code = getCode();
	asserts.equal(code == expectedCode);
};
function test_1parseRepeatLoop = function()
{
var loopcode = ['// repeat loop',
				'for (var count = 0; count < 10; count++) {',
				'if(--window.LoopTrap == 0) throw "Infinite loop.";',
				  'window.alert('');'
				'} //end loop'];
	var expectedCode = 'var count = 0;
						var loopfunction0 = function(){
							if(count < 10){
								window.alert('');
								count++;
							}
							queue.push(functionLoop0);
						}';
	parseRepeatLoop(loopcode, 0, false, 0);
	var code = getCode();
	asserts.equal(code == expectedCode);
}