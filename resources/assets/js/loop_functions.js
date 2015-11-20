//code that will eventually be passed into the intepreter
var funcCode = '';

/* Method to parse while loops into a function based while loop */
var parseWhileLoop = function (lines, loopCount, remaining, numRecursion) {
	var loopGuard = trimAndGetLoopGuard(lines);
	loopGuard = S(loopGuard).chompLeft('while ').chompRight(' {').s;

	funcCode += getLoopFunctionHeaderString(loopCount)
			 	+'if' + loopGuard + '{\n';
	var hasInnerLoop = (getBeforeStartOfLoop(lines) > -1);//lookForLoop(lines, loopCount, numRecursion + 1);

	funcCode += 'queue.push(functionLoop' + (hasInnerLoop ? (loopCount + 1) : loopCount) + ');\n}\n';
			
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
/* Method to repeat while loops into a function based repeat loop */
var parseRepeatLoop = function (lines, loopCount, remaining, numRecursion) {
	var loopGuard = trimAndGetLoopGuard(lines);
	loopGuard = S(loopGuard).chompLeft('for (').chompRight(') {').s;
	var forLoopParts = loopGuard.split(';'); //gets the 3 parts of a for loop

	funcCode += forLoopParts[0] + ';\n' + getLoopFunctionHeaderString(loopCount)
			 	+ 'if(' + forLoopParts[1] + '){\n';

	var hasInnerLoop = (getBeforeStartOfLoop(lines) > -1);

	funcCode +=   S(forLoopParts[2]).trim().s
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
/* Method to parse forever loops into a function based forever loop */
var parseForeverLoop = function (lines, loopCount) {
	trimAndGetLoopGuard(lines);
	
	funcCode += getLoopFunctionHeaderString(loopCount);
	var hasInnerLoop = (getBeforeStartOfLoop(lines) > -1);
	funcCode += 'queue.push(functionLoop'
			+ (hasInnerLoop ? (loopCount + 1) : loopCount) + ');\n};\n';
			
	if(hasInnerLoop)
	{
		lookForLoop(lines, loopCount, 1);
	}
};
/* Method to grab any code that is underneath the loop and insert it into function that is executed
   when the loop ends. This function will call the outerloop if it does not contain a loop itself */
var parseRemaining = function(lines, loopCount, numRecursion) {
	funcCode += 'var remainingCodeForLoop' + loopCount + ' = function() {\n';

	var hasInnerLoop = (getBeforeStartOfLoop(lines) > -1);
	
	//funcCode += lines.join("\n") + '\n';
	
	// if LoopCount == 0, don't call outer loop.
	if(numRecursion > 0) {
		funcCode += 'queue.push(functionLoop' + (loopCount - 1) + ');\n';
	}
	if(hasInnerLoop) {
		lookForLoop(lines, loopCount, numRecursion);
		funcCode += 'queue.push(functionLoop' + (loopCount + 1) + ');\n';
	}
	
	funcCode += '};\n';
};

/* Method to loop for an inner loop and parse it */
var lookForLoop = function (lines, loopCount, numRecursion) {
	var hasLoop = getBeforeStartOfLoop(lines);
	var loopType = lines[0];
	determineLoop(lines, loopType, loopCount + 1, 0, numRecursion);
	//lines.splice(start, (lines.length - start));
	return hasLoop;

};
/* Method to get all of the code that occurs before any loop starts (globals and other executions) */
var getBeforeStartOfLoop = function (lines) {
	var start = findStartOfLoop(lines);
	if(start > 0) {
		funcCode += lines.slice(0, start).join('\n') + '\n';
		lines.splice(0, start);
	}
	else if (start == -1)
	{
		funcCode += lines.join('\n') + '\n';
	}
	return start
		
};
/* Method to find where a loop starts based on comment flag */
var findStartOfLoop = function(lines)
{
	for(var i = 0; i < lines.length; i++)
	{
		if (!S(lines[i]).contains('}') && S(lines[i]).contains('//') && S(lines[i]).contains('loop'))
			return i;
	}
	return -1;
};

/* Method to determine the type of loop and call the corresponding function to parse it.
   Also checks for an innerloop and removes it from the lines array before sending it to parse */
var determineLoop = function (lines, loopType, loopCount, start, numRecursion) {
	var looparr = getInnerLoopArray(lines, start);
	lines.splice(0, looparr.length + start);
	var remaining = (looparr.length > 0 && lines.length > 0);
	if(remaining)
	{
		parseRemaining(lines,loopCount,numRecursion);
	}
	
	switch (loopType)
	{
		case '// repeat loop':
			parseRepeatLoop(looparr, loopCount, remaining, numRecursion);
			break;
		case '// while loop':
			parseWhileLoop(looparr, loopCount, remaining, numRecursion);
			break;
		case '// forever loop':
			parseForeverLoop(looparr, loopCount);
			break;
	}
};
/* Method to find the entire inner loop array based on the number of loop starts versus the number
   of loop ends */
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

/* Method to create the LoopFunctionHeader */
var getLoopFunctionHeaderString = function (loopCount) {
	return 'var functionLoop' + loopCount + ' = function() {\n';
};
/* Method to trim the loop guard */
var trimAndGetLoopGuard = function (lines) {
	lines.shift(); // Removes loop comment
	var loopGuard = lines.shift(); // Removes loop header
	lines.pop(); // Removes '} //end loop'
	return loopGuard;
};
/* Method to return the function code */
var getFuncCode = function () {
	return funcCode;
};
/* Method to reset the funtion code */
var resetFuncCode = function() {
	funcCode = '';
};