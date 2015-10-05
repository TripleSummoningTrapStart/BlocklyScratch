/**
 * @loopCode array
 */
var parseLoop = function (loopCode, recurMod)
{
	var code = "";
	var loopHead;
	var loopGuard;
	if(loopCode[0].search('loop') > 0)
	{
		loopHead = loopCode.shift();
		loopGuard = loopCode.shift();
		loopCode.pop();
		code = 'var functionLoop' + recurMod + ' = function() {\n' + parseLoop(loopCode, recurMod++) + '\n};';
		// TODO queuing
	}
	else
	{
		code = S(loopCode.toString()).strip(',').s;
	}
 	return code;
 };

var parseForeverLoop = function (lines, start, end, loopCount)
{
	var loopGuard = '';
	var innerLoopType;
	var inner = false;
	var code = '';

	for(var i = start + 1; i <= end; i++)
	{
		if(lines[i].search('//') > -1 && S(lines[i]).contains('loop'))
		{
			innerLoopType = lines[i];
			continue;
		}
		if(lines[i].search('while') > -1 || lines[i].search('for') > -1)
		{
			loopGuard = S(lines[i]).strip('while', 'for').s;
			loopGuard = loopGuard.chompLeft('(').s;
			loopGuard = loopGuard.chompRight(') {').s;
			inner = true;
			break;
		}
	}

	lines.splice(end--, 1);

	code += 'var functionLoop' + loopCount++ + ' = function() { \n';

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

	injectCode(lines, start, end, code);
};

var determineLoop = function (lines, loopType, loopCount)
{

};

var injectCode = function (lines, start, end, code)
{

};

var getInnerCode = function (lines, start, end) {

};
