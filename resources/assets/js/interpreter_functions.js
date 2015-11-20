var addConsoleText = function(text)
{
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
	var xVal = parseInt(obj.getAttribute("cx"));
	for(var i = 0; i < steps; i++)
	{
		xVal += i;
		obj.setAttribute("cx", xVal);
	}
};
// rotateclock
// rotatecounterclock
var setX = function (id, newVal) {
	var obj = document.getElementById(id);
	obj.setAttribute("cx", newVal);
};
var setY = function (id, newVal) {
	var obj = document.getElementById(id);
	obj.setAttribute("cy", newVal);
};
var changeX = function (id, newVal) {
	var obj = document.getElementById(id);
	if (obj != null) {
		obj.setAttribute("cx", parseInt(obj.getAttribute("cx")) + newVal);
	}
};
var changeX = function (id, newVal) {
	var obj = document.getElementById(id);
	if (obj != null) {
		obj.setAttribute("cy", parseInt(obj.getAttribute("cy")) + newVal);
	}
};
var gotoXY = function (id, xVal, yVal) {
	var obj = document.getElementById(id);
	if (obj != null) {
		xVal = xVal ? xVal.data : obj.getAttribute("cx");
		yVal = yVal ? yVal.data : obj.getAttribute("cy");
		obj.setAttribute("cx", xVal);
		obj.setAttribute("cy", yVal);
	}
};