var funcCode = '';

var parseWhileLoop = function (lines, loopCount, remaining, numRecursion) {
	var loopGuard = trimAndGetLoopGuard(lines);
	loopGuard = S(loopGuard).chompLeft('while ').chompRight(' {').s;

	funcCode += getLoopFunctionHeaderString(loopCount);
	var hasInnerLoop = (getBeforeStartOfLoop(lines) > -1);//lookForLoop(lines, loopCount, numRecursion + 1);

	funcCode += 'if' + loopGuard + '{\n'+ lines.join("\n")
				+'\nqueue.push(functionLoop' + (hasInnerLoop ? (loopCount + 1) : loopCount) + ');\n}\n';
			
	if(remaining){
		funcCode += 'else{\nqueue.push(remainingCodeForLoop' + loopCount + ');\n}\n';
	}
	else if(numRecursion > 0){
		funcCode += 'else{\nqueue.push(functionLoop' + (loopCount - 1) + ');\n}\n';
	}
	funcCode += '};\n';

	if(hasInnerLoop)
	{
		lookForLoop(lines, loopCount, numRecursion + 1);
	}
};

var parseRepeatLoop = function (lines, loopCount, remaining, numRecursion) {
	var loopGuard = trimAndGetLoopGuard(lines);
	loopGuard = S(loopGuard).chompLeft('for (').chompRight(') {').s;
	var forLoopParts = loopGuard.split(';'); //gets the 3 parts of a for loop
	
	funcCode += forLoopParts[0] + ';\n' + getLoopFunctionHeaderString(loopCount);

	var hasInnerLoop = (getBeforeStartOfLoop(lines) > -1);//lookForLoop(lines, loopCount, numRecursion + 1);

	funcCode += 'if(' + forLoopParts[1] + '){\n' + lines.join("\n") + '\n' + S(forLoopParts[2]).trim().s
				+ ';\nqueue.push(functionLoop' + (hasInnerLoop ? (loopCount + 1) : loopCount) + ');\n}\n';
			
	if(remaining){
		funcCode += 'else{\nqueue.push(remainingCodeForLoop' + loopCount + ');\n'
		+ S(forLoopParts[2]).trim().replace('++', ' = 0;').s + '\n}\n';
	}
	else if(numRecursion > 0){
		funcCode += 'else{\nqueue.push(functionLoop' + (loopCount - 1) + ');\n'
			+ S(forLoopParts[2]).trim().replace('++', ' = 0;').s + '\n}\n';
	}
	funcCode += '};\n';

	if(hasInnerLoop)
	{
		lookForLoop(lines, loopCount, numRecursion + 1);
	}
};

var parseForeverLoop = function (lines, loopCount) {
	trimAndGetLoopGuard(lines);
	
	var hasInnerLoop = false;
	hasInnerLoop = lookForLoop(lines, loopCount, 0);
	
	funcCode += getLoopFunctionHeaderString(loopCount)
			+ lines.join("\n") + '\nqueue.push(functionLoop'
			+ (hasInnerLoop ? (loopCount + 1) : loopCount) + ');\n};\n';
};

var parseRemaining = function(lines, loopCount, numRecursion) {
	funcCode += 'var remainingCodeForLoop' + loopCount + ' = function() {\n';

	var hasInnerLoop = false;
	hasInnerLoop = lookForLoop(lines, loopCount, numRecursion);
	
	funcCode += lines.join("\n") + '\n';
	
	// if LoopCount == 0, don't call outer loop.
	if(numRecursion > 0)
	{
		funcCode += 'queue.push(functionLoop' + (loopCount - 1) + ');\n';
	}
	if(hasInnerLoop){
		funcCode += 'queue.push(functionLoop' + (loopCount + 1) + ');\n';
	}
	
	funcCode += '};\n';
};

//If inner loop, parses and returns true
var lookForLoop = function (lines, loopCount, numRecursion) {
	getBeforeStartOfLoop(lines);
	var loopType = lines[0];
	determineLoop(lines, loopType, loopCount + 1, 0, numRecursion);
	//lines.splice(start, (lines.length - start));

};

var getBeforeStartOfLoop = function (lines) {
	var start = findStartOfLoop(lines);
	if(start != -1) {
		funcCode += lines.slice(0, start).join('\n') + '\n';
		lines.splice(0, start);
	}
	return start
		
};

var findStartOfLoop = function(lines)
{
	for(var i = 0; i < lines.length; i++)
	{
		if (!S(lines[i]).contains('}') && S(lines[i]).contains('//') && S(lines[i]).contains('loop'))
			return i;
	}
	return -1;
};

var determineLoop = function (lines, loopType, loopCount, start, numRecursion) {
	var looparr = getInnerLoopArray(lines, start);
	lines.splice(0, looparr.length + start);
	var remaining = (looparr.length > 0 && lines.length > 0);
	if(remaining)//what was this for?
	{
		parseRemaining(lines,loopCount,numRecursion);
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

var checkForRemainingCode = function(arrLength1, arrLength2) {
	return !(arrLength1 >= arrLength2);
};

//to avoid issues with stacked loops which is why we don't use lines.reverse to find end of loop.
var getInnerLoopArray = function (lines, start) {
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

var getLoopFunctionHeaderString = function (loopCount) {
	return 'var functionLoop' + loopCount + ' = function() {\n';
};

var trimAndGetLoopGuard = function (lines) {
	lines.shift(); // Removes loop comment
	var loopGuard = lines.shift(); // Removes loop header
	lines.pop(); // Removes '} //end loop'
	return loopGuard;
};

var getFuncCode = function () {
	return funcCode;
};

var resetFuncCode = function() {
	funcCode = '';
};