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

var parseForeverLoop = function (lines, loopCount)
{
	var code = '';
	lines.shift(); // Removes '// forever loop'
	lines.shift(); // Removes 'while (true) {'
	lines.pop(); // Removes '} //end loop'
	var i = 0;
	var remaining = false;

	while (i < lines.length)
	{
		if(S(lines[i]).contains('//') && S(lines[i]).contains('loop')) {
			var loopType = lines[i];
			var innerArr = getInnerCodeArray(lines, i);
			var innerLength = innerArr.length;

			if(innerLength + i < lines.length - 1)
			{
				remaining = true;
			}

			lines[i] = determineLoop(innerArr, loopType, loopCount + 1, remaining);
			lines.splice(i + 1, innerLength);
		}
		if(remaining)
		{

		}
		i++;
	}

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

	// TODO add queueing

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

var parseRemaining = function(lines, funcNum)
{

}
var determineLoop = function (lines, loopType, loopCount, remaining)
{
	// Standard loop parse: (lines, start, end, loopCount)
	return parseForeverLoop(lines, loopCount);
	switch (loopType)
	{
		case '// repeat loop':

		case '// while loop':

		case '// forever loop':
			
	}
};

var injectCode = function (lines, start, end, code)
{
	lines[start] = code;
	lines.splice(start + 1, end - start);
};

var getInnerCodeArray = function (lines, start) {
	return ["// forever loop\n", "while (true) {\n", "window.alert('hello');\n", "}\n"];
};

var getInnerCode = function (lines, start, end) {
	return lines.slice(start, end).join('\n');
};

