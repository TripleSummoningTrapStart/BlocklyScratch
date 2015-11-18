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
	var wrapper = function(obj, xVal)
	{
		xVal = typeof xVal === 'number' ? xVal : 0;
		return interpreter.createPrimitive(setX(obj, xVal));
	}
	interpreter.setProperty(scope, 'setX', interpreter.createNativeFunction(wrapper));
	var wrapper = function(obj, yVal)
	{
		yVal = typeof yVal === 'number' ? yVal : 0;
		return interpreter.createPrimitive(setY(obj, yVal));
	}
	interpreter.setProperty(scope, 'setY', interpreter.createNativeFunction(wrapper));
};