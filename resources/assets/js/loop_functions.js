var remainingLoopNum = 0;

/**
 * @loopCode array
 */
var parseLoop = function (loopCode, recurMod)
{
	var code = "";
	var loopType;
	var loopGuard;
	if(loopCode[0].search('loop') > 0)
	{
		loopType = loopCode.shift();
		//loopGuard = loopCode.shift();
		//loopCode.pop();
		//code = 'var functionLoop' + recurMod + ' = function() {\n' + parseLoop(loopCode, recurMod++) + '\n};';
		// TODO begin recursive calls for parsing loops
	}
	else
	{
		code = S(loopCode.toString()).strip(',').s;
	}
 	return code;
 };

var parseWhileLoop = function (lines, loopCount, remaining) {

};

var parseRepeatLoop = function (lines, loopCount, remaining) {

};

var parseForeverLoop = function (lines, loopCount)
{
	var code = '';
	lines.shift(); // Removes '// forever loop'
	lines.shift(); // Removes 'while (true) {'
	lines.pop(); // Removes '} //end loop'
	var i = 0;
	var hasInnerLoop = false;
		/*if(remaining)
		{
			var remainLinesLength = lines.length - i;
			lines[i] = parseRemaining(lines.slice(i), loopCount);
			lines[i].splice(i + 1, remainLinesLength);
			break;
		}
		if(S(lines[i]).contains('//') && S(lines[i]).contains('loop')) {
			var loopType = lines[i];
			var innerArr = getInnerLoopArray(lines, i);
			var innerLength = innerArr.length;

			if(innerLength + i < lines.length - 1)
			{
				remaining = true;
			}

			lines[i] = determineLoop(innerArr, loopType, loopCount + 1, i);
			lines.splice(i + 1, innerLength);
		}*/
		hasInnerLoop = lookForLoop(lines, loopCount);

	/* Old inner loop logic
	var loopGuard = '';
	var innerLoopType;
	var inner = false;
	var code = '';

	for(var i = 1; i < lines.length - 1; i++)
	{
		if(lines[i].search('//') > -1 && S(lines[i]).contains('loop'))
		{
			innerLoopType = lines[i];
			loopGuard = S(lines[i + 1]).strip('while', 'for').s;
			loopGuard = loopGuard.chompLeft('(').s;
			loopGuard = loopGuard.chompRight(') {').s;
			inner = true;
			break;
		}
	}*/

	code += 'var functionLoop' + loopCount + ' = function() { \n';
	code += lines.join('\n');

	code += 'queue.push(functionLoop' + (hasInnerLoop ? (loopCount + 1) : loopCount) + ');';

	code += '};\n';

	/* Old Queueing code
	if(inner)
	{
		code += determineLoop(lines, innerLoopType, loopCount);
		code += getInnerCode(lines, start, end);
		if(loopGuard != 'true')
		{
			code += 'if (!(' + loopGuard + ')) {\nqueue.push(functionLoop' +
				(loopCount -1) + '\nqueue.push(functionLoop' + loopCount + ');\n';
		}
		else
		{
			code += 'queue.push(functionLoop' + loopCount + ');\n';
		}
	}
	else
	{
		code += getInnerCode(lines, start, end);
		code += 'queue.push(functionLoop' + (loopCount - 1) + ');\n';
	}
	injectCode(lines, start, end, code);*/
	return code;
};

var parseRemaining = function(lines, loopCount)
{
	var code = 'var remainFunction' + remainingLoopNum++ + ' = function() {\n';

	/*if(remaining)
		{
			var remainLinesLength = lines.length - i;
			lines[i] = parseRemaining(lines.slice(i));
			lines[i].splice(i + 1, remainLinesLength);
			break;
		}*/

	lookForLoop(lines, loopCount);
	code += lines.join("\n");

	// if LoopCount == 0, don't call outer loop
	if(loopCount > 0)
	{
		code += 'queue.push(loopFunction' + loopCount + ');';
	}

	code += '};\n';
	return code;
};

//If inner loop, parses and returns true
var lookForLoop = function (lines, loopCount) {
	var i = 0;

	while (i < lines.length) {
	if (!S(lines[i]).contains('}') && S(lines[i]).contains('//') && S(lines[i]).contains('loop')) {
			var loopType = lines[i];

			lines[i] = determineLoop(lines, loopType, loopCount + 1, i);
			lines.splice(i + 1, (lines.length - i));
			return true;
		}
		i++;
	}
	return false;
};

var determineLoop = function (lines, loopType, loopCount, start)
{
	// Standard loop parse: (lines, loopCount)
	var looparr = getInnerLoopArray(lines, start);
	lines.splice(start, looparr);
	var remaining = checkForRemainingCode(looparr.length, lines.length);

	if(remaining)
	{

	}


	switch (loopType)
	{
		case '// repeat loop':
			return parseRepeatLoop(looparr, loopCount, remaining);
		case '// while loop':
			return parseWhileLoop(looparr, loopCount, remaining);
		case '// forever loop':
			return parseForeverLoop(looparr, loopCount);
	}
};

var checkForRemainingCode = function(arrLength1, arrLength2)
{
	if(arrLength1 == arrLength2)
	{
		return false;
	}
	return true;
};

//Depreciated
var injectCode = function (lines, start, end, code)
{
	lines[start] = code;
	lines.splice(start + 1, end - start);
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

//Depreciated
var getInnerCode = function (lines, start, end) {
	return lines.slice(start, end).join('\n');
};