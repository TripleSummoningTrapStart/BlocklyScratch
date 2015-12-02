var addConsoleText = function(text) {
	var textarea = document.getElementById("textArea");
	textarea.innerHTML += text + '&#13;&#10;';
	textarea.scrollTop = textarea.scrollHeight;
};
var highlightBlock = function(id) {
	workspace.highlightBlock(id);
	highlightPause = true;
};
var moveStep = function(id, steps) {
	var obj = document.getElementById(id);
	var xVal = parseInt(obj.getAttribute("x"));
	for(var i = 0; i < steps; i++)
	{
		xVal += i;
		obj.setAttribute("x", xVal);
	}
};
var rotateClock = function(id, rotateVal) {
	var obj = document.getElementById(id);
	var rotateAngle = obj.getAttribute("transform");
	if(rotateAngle != null)
	{
		rotateAngle = S(rotateAngle).chompLeft("rotate(").chompRight(')').s;
		rotateAngle = rotateAngle.split(',');
		rotateVal += parseInt(rotateAngle[0]);
		if(rotateVal > 0 && rotateVal > 360)
		{
			rotateVal -= 360;
		}
		else if(rotateVal < 0 && Math.abs(rotateVal) > 360)
		{
			rotateVal += 360;
		}
	}
	var objXCenter = parseInt(obj.getAttribute("x")) + parseInt(obj.getAttribute("width"))/2;
	var objYCenter = parseInt(obj.getAttribute("y")) + parseInt(obj.getAttribute("height"))/2;
	obj.setAttribute("transform", "rotate(" + rotateVal + "," + objXCenter + "," + objYCenter +")");
}
var setX = function (id, newVal) {
	var obj = document.getElementById(id);
	obj.setAttribute("x", newVal);
};
var setY = function (id, newVal) {
	var obj = document.getElementById(id);
	obj.setAttribute("y", newVal);
};
var changeX = function (id, newVal) {
	var obj = document.getElementById(id);
	if (obj != null) {
		obj.setAttribute("x", parseInt(obj.getAttribute("x")) + newVal);
	}
};
var changeY = function (id, newVal) {
	var obj = document.getElementById(id);
	if (obj != null) {
		obj.setAttribute("y", parseInt(obj.getAttribute("y")) + newVal);
	}
};
var gotoXY = function (id, xVal, yVal) {
	var obj = document.getElementById(id);
	if (obj != null) {
		xVal = xVal ? xVal.data : obj.getAttribute("x");
		yVal = yVal ? yVal.data : obj.getAttribute("y");
		obj.setAttribute("x", xVal);
		obj.setAttribute("y", yVal);
	}
};
var glideTo = function(id, time, x, y) {
	if(parseInt(time) == 0)
	{
		time = 1;
	}
	var obj = document.getElementById(id);
	var xVal = parseInt(obj.getAttribute("x"));
	var yVal = parseInt(obj.getAttribute("y"));
	var xInc = (parseInt(x) - xVal) / parseInt(time);
	var yInc = (parseInt(y) - yVal) / parseInt(time);
	while(Math.ceil(xVal) != x)
	{
		xVal += xInc;
		yVal += yInc;
		obj.setAttribute("x", xVal);
		obj.setAttribute("y", yVal);
	}
	
}