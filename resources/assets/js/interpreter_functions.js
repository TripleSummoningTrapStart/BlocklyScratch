var hold;
var obj;
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
var rotateClock = function(id, rotateVal, rotateInc) {
	/*  if(rotateVal > 0 && rotateVal > 360)
		{
			rotateVal -= 360;
		}
		else if(rotateVal < 0 && Math.abs(rotateVal) > 360)
		{
			rotateVal += 360;
		}*/
	var obj = s.select('#'+id);
	var objX = parseInt(obj.attr('x')) + parseInt(obj.attr('width')/2);
	var objY = parseInt(obj.attr('y')) + parseInt(obj.attr('height')/2);

	obj.animate({ transform: "r" + rotateVal + ',' + objX + ',' + objY}, 50 , function(){
				rotateVal = rotateVal + rotateInc;	
				rotateClock(id, rotateVal,rotateInc); // Repeat this animation so it appears infinite.
			} );
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
	/*if(time == 0)
	{
		time = 1;
	}
	var obj = document.getElementById(id);
	var xVal = parseInt(obj.getAttribute("x"));
	var yVal = parseInt(obj.getAttribute("y"));
	var xInc = (parseInt(x) - xVal)/ time;
	var yInc = (parseInt(y) - yVal) / time;
	if(Math.ceil(xVal) != x)
	{
		xVal += xInc;
		yVal += yInc;
		obj.setAttribute("x", xVal);
		obj.setAttribute("y", yVal);
		return true;
	}
	return false;*/
	obj = s.select('#'+id);
	var objX = x - parseInt(obj.attr('x'));
	var objY = y + parseInt(obj.attr('y'));
	
	if(!obj.matrix)
	{
		m = new Snap.Matrix().translate(objX, objY);
	}
	else
	{
		m = obj.matrix.translate(objX, objY);
	}
	obj.animate({ transform: m }, (time * 1000), function(){}, setLocation(id, objX, objY));
}
var setLocation = function(id, x, y) {
	//var obj = s.select('#'+id);

	//obj.attr({'x': x, 'y': y});
}