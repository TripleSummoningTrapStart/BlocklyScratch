function initApi(interpreter, scope) {
	var wrapper = function(text)
	{
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(alert(text));
	}
	interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
	wrapper = function(text){
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(prompt(text));
	};
	var wrapper = function(id)
	{
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(highlightBlock(id));
	}
	interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
	var wrapper = function(text)
	{
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(addConsoleText(text));
	}
	interpreter.setProperty(scope, 'addConsoleText', interpreter.createNativeFunction(wrapper));
	var wrapper = function(id, xVal)
	{
		xVal = xVal ? xVal.data : 0;
		id = id ? id.data : '';
		return interpreter.createPrimitive(setX(id, xVal));
	}
	interpreter.setProperty(scope, 'setX', interpreter.createNativeFunction(wrapper));
	var wrapper = function(id, yVal)
	{
		yVal = yVal ? yVal.data : 0;
		id = id ? id.data : '';
		return interpreter.createPrimitive(setY(id, yVal));
	}
	interpreter.setProperty(scope, 'setY', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, xVal, yVal) {
		id = id ? id.data : '';
		return interpreter.createPrimitive(gotoXY(id, xVal, yVal));
	}
	interpreter.setProperty(scope, 'gotoXY', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, steps) {
		steps = steps ? steps.data : '';
		return interpreter.createPrimitive(moveStep(id, steps));
	}
	interpreter.setProperty(scope, 'moveStep', interpreter.createNativeFunction(wrapper));
};