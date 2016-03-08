function initApi(interpreter, scope) {
	var wrapper = function(text){
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(alert(text));
	}
	interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
	wrapper = function(text){
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(prompt(text));
	};
	var wrapper = function(id){
		id = id ? id.toString() : '';
		return interpreter.createPrimitive(highlightBlock(id));
	}
	interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
	var wrapper = function(text){
		text = text ? text.toString() : '';
		return interpreter.createPrimitive(addConsoleText(text));
	}
	interpreter.setProperty(scope, 'addConsoleText', interpreter.createNativeFunction(wrapper));
	var wrapper = function(id, xVal){
		xVal = xVal ? xVal.data : 0;
		id = id ? id.data : '';
		return interpreter.createPrimitive(setX(id, xVal));
	}
	interpreter.setProperty(scope, 'setX', interpreter.createNativeFunction(wrapper));
	var wrapper = function(id, yVal){
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
	var wrapper = function (id) {
		id = id ? id.data : '';
		return interpreter.createPrimitive(gotoMouse(id));
	}
	interpreter.setProperty(scope, 'gotoMouse', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, steps) {
		steps = steps ? steps.data : 0;
		id = id ? id.data : '';
		return interpreter.createPrimitive(moveStep(id, steps));
	}
	interpreter.setProperty(scope, 'moveStep', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, changeVal) {
		changeVal = changeVal ? changeVal.data : 0;
		id = id ? id.data : '';
		return interpreter.createPrimitive(changeX(id, changeVal));
	}
	interpreter.setProperty(scope, 'changeX', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, changeVal) {
		changeVal = changeVal ? changeVal.data : 0;
		id = id ? id.data : '';
		return interpreter.createPrimitive(changeY(id, changeVal));
	}
	interpreter.setProperty(scope, 'changeY', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, rotateVal) {
		rotateVal = rotateVal ? rotateVal.data : 0;
		id = id ? id.data : '';
		return interpreter.createPrimitive(rotate(id, rotateVal));
	}
	interpreter.setProperty(scope, 'rotate', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, time, x, y) {
		time = time ? time.data : 0;
		x = x ? x.data : 0;
		y = y ? y.data : 0;
		id = id ? id.data : '';
		return interpreter.createPrimitive(glideTo(id, time, x, y));
	}
	interpreter.setProperty(scope, 'glideTo', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, dir) {
		dir = dir ? dir.data : 90;
		id = id ? id.data : '';
		return interpreter.createPrimitive(pointIn(id, dir));
	}
	interpreter.setProperty(scope, 'pointIn', interpreter.createNativeFunction(wrapper));
	var wrapper = function (id, rotateStyle) {
		rotateStyle = rotateStyle ? rotateStyle.data : 'all';
		id = id ? id.data : '';
		return interpreter.createPrimitive(setRotationStyle(id, rotateStyle));
	}
	var wrapper = function (id, rotateStyle) {
		id = id ? id.data : '';
		return interpreter.createPrimitive(edgeBounce(id));
	}
	interpreter.setProperty(scope, 'edgeBounce', interpreter.createNativeFunction(wrapper));
	var wrapper = function (spriteID) {
		spriteID = spriteID ? spriteID.data : '';
		return interpreter.createPrimitive(pointTowardsMouse(spriteID));
	}
	interpreter.setProperty(scope, 'pointTowardsMouse', interpreter.createNativeFunction(wrapper));
	var wrapper = function (spriteID, objID) {
		spriteID = spriteID ? spriteID.data : '';
		objID = objID ? id.data : '';
		return interpreter.createPrimitive(pointTowards(spriteID, objID));
	}
	interpreter.setProperty(scope, 'pointTowards', interpreter.createNativeFunction(wrapper));

	var wrapper = function(spriteID){
		spriteID = spriteID ? spriteID.data : '';
		return  interpreter.createPrimitive(penDown(spriteID));
	}
	interpreter.setProperty(scope, 'penDown', interpreter.createNativeFunction(wrapper));
	var wrapper = function(spriteID){
		spriteID = spriteID ? spriteID.data : '';
		return  interpreter.createPrimitive(penUp(spriteID));
	}
	interpreter.setProperty(scope, 'penUp', interpreter.createNativeFunction(wrapper));
	var wrapper = function(spriteID, setVal){
		setVal = setVal ? setVal.data : 0;
		spriteID = spriteID ? spriteID.data : '';
		return interpreter.createPrimitive(setSize(spriteID, setVal));
	}
	interpreter.setProperty(scope, 'setSize', interpreter.createNativeFunction(wrapper));
	var wrapper = function(spriteID, setVal){
		setVal = setVal ? setVal.data : 0;
		spriteID = spriteID ? spriteID.data : '';
		return interpreter.createPrimitive(changeSize(spriteID, setVal));
	}
	interpreter.setProperty(scope, 'changeSize', interpreter.createNativeFunction(wrapper));
	var wrapper = function(spriteID, setVal){
		setVal = setVal ? setVal.data : 0;
		spriteID = spriteID ? spriteID.data : '';
		return interpreter.createPrimitive(changeShade(spriteID, setVal));
	}
	interpreter.setProperty(scope, 'changeShade', interpreter.createNativeFunction(wrapper));
	var wrapper = function(spriteID, setVal){
		setVal = setVal ? setVal.data : 0;
		spriteID = spriteID ? spriteID.data : '';
		return interpreter.createPrimitive(setShade(spriteID, setVal));
	}
	interpreter.setProperty(scope, 'setShade', interpreter.createNativeFunction(wrapper));
};
