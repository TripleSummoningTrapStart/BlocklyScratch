var code = '';

var parseWhileLoop = function (lines, loopCount, remaining, numRecursion) {
	//var remainingCode = '';
	lines.shift(); // Removes '// forever loop'
	var loopGuard = lines.shift(); // Removes 'while (true) {'
	loopGuard = S(loopGuard).chompLeft('while ').chompRight(' {').s;
	/*if(remaining)
	{
		remainingCode = lines.pop(); //gets the remaining code
	}*/
	lines.pop(); // Removes '} //end loop'
	var hasInnerLoop = false;
	hasInnerLoop = lookForLoop(lines, loopCount, numRecursion + 1);
	code += 'var functionLoop' + loopCount + ' = function() { \n'
			+ 'if' + loopGuard + '{\n' + lines.join("\n")
			+ '\nqueue.push(functionLoop' + (hasInnerLoop ? (loopCount + 1) : loopCount) + ');\n}\n';
	if(remaining){
		code += 'else{\nqueue.push(remainingCodeForLoop' + loopCount + ');\n}\n';
	}
	else if(numRecursion > 0){
		code += 'else{\nqueue.push(functionLoop' + (loopCount-1) + ');\n}\n';
	}
	code += '};\n';
};

var parseRepeatLoop = function (lines, loopCount, remaining, numRecursion) {
	//var remainingCode = '';
	//var code = '';
	lines.shift(); // Removes '// forever loop'
	var loopGuard = lines.shift(); // Removes 'while (true) {'
	loopGuard = S(loopGuard).chompLeft('for (').chompRight(') {').s;
	var forLoopParts = loopGuard.split(';'); //gets the 3 parts of a for loop
	/*if(remaining)
	{
		remainingCode = lines.pop(); //gets the remaining code
	}*/
	lines.pop(); // Removes '} //end loop'
	var hasInnerLoop = false;
	hasInnerLoop = lookForLoop(lines, loopCount, numRecursion + 1);
	code += forLoopParts[0] + ';\n' + 'var functionLoop' + loopCount
			+ ' = function() { \nif(' + forLoopParts[1] + '){\n'
			+ lines.join("\n") + forLoopParts[2] + '\nqueue.push(functionLoop'
			+ (hasInnerLoop ? (loopCount + 1) : loopCount) + ');\n}\n';
	if(remaining){
		code += 'else{\nqueue.push(remainingCodeForLoop' + loopCount + ');\n}\n';
	}
	else if(numRecursion > 0){
		code += 'else{\nqueue.push(functionLoop' + (loopCount-1) + ');\n}\n';
	}
	code += '};\n';
};

var parseForeverLoop = function (lines, loopCount)
{
	//var code = '';
	lines.shift(); // Removes '// forever loop'
	lines.shift(); // Removes 'while (true) {'
	lines.pop(); // Removes '} //end loop'
	var hasInnerLoop = false;
	hasInnerLoop = lookForLoop(lines, loopCount, 0);
	code += 'var functionLoop' + loopCount + ' = function() { \n'
			+ lines.join("\n") + 'queue.push(functionLoop'
			+ (hasInnerLoop ? (loopCount + 1) : loopCount) + ');\n};\n';
};

var parseRemaining = function(lines, loopCount, numRecursion)
{
	code += 'var remainingCodeForLoop' + loopCount + ' = function() {\n';

	var hasInnerLoop = false;
	hasInnerLoop = lookForLoop(lines, loopCount, numRecursion);
	code += lines.join("\n");
	// if LoopCount == 0, don't call outer loop.
	if(numRecursion > 0)
	{
		code += 'queue.push(functionLoop' + (loopCount - 1) + ');\n';
	}
	if(hasInnerLoop){
		code += 'queue.push(functionLoop' + (loopCount + 1) + ');\n';
	}
	code += '};//endRemaining\n';
};

//If inner loop, parses and returns true
var lookForLoop = function (lines, loopCount, numRecursion) {
	var i = 0;
	while (i < lines.length) {
	if (!S(lines[i]).contains('}') && S(lines[i]).contains('//') && S(lines[i]).contains('loop')) {
			var loopType = lines[i];

			determineLoop(lines, loopType, loopCount + 1, i, numRecursion);
			lines.splice(i, (lines.length - i -1));
			return true;
		}
		i++;
	}
	return false;
};

var determineLoop = function (lines, loopType, loopCount, start, numRecursion)
{
	var looparr = getInnerLoopArray(lines, start);
	lines.splice(start, looparr);
	var remaining = checkForRemainingCode(looparr.length + start, lines.length);
	if(remaining)//what was this for?
	{
		looparr.push(parseRemaining(lines.slice(looparr.length + start, lines.length),loopCount,numRecursion));
	}
	switch (loopType)
	{
		case '// repeat loop':
			return parseRepeatLoop(looparr, loopCount, remaining, numRecursion);
		case '// while loop':
			return parseWhileLoop(looparr, loopCount, remaining, numRecursion);
		case '// forever loop':
			return parseForeverLoop(looparr, loopCount);
	}
};

var checkForRemainingCode = function(arrLength1, arrLength2)
{
	return !(arrLength1 == arrLength2);
};

var getInnerLoopArray = function (lines, start) {
	//return ["// forever loop\n", "while (true) {\n", "window.alert('hello');\n", "}\n"];
	var numLoopStarts = 0; //parsed out first hat when method is called, starts at one to prevent break case;
	var numLoopEnd = 0;
	var loopEndPosition = 0;
	for(var i = start; i < lines.length; i++)
	{
		if(!S(lines[i]).contains('}') && S(lines[i]).contains('//') && S(lines[i]).contains('loop'))
		{
			numLoopStarts++;
		}
		else if(S(lines[i]).contains('} //end loop'))
		{
			numLoopEnd++;
			if(numLoopStarts == numLoopEnd)
			{
				loopEndPosition = i + 1; // used to include last element
				break;
			}
		}
	}
	return lines.slice(start, loopEndPosition);
};

var getCode = function () {
	return code;
};