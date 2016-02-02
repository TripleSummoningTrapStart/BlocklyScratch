var adjX = 200;
var adjY = 140;
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
	var obj = s.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	for(var i = 0; i < steps; i++)
	{
		xVal += i;
		obj.setAttribute("x", xVal);
	}
};
var rotateClock = function(id, rotateVal) {
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
	var m;
	if(!obj.matrix)	{
		m = new Snap.Matrix().rotate(rotateVal, objX, objY);
		//m.translate(objX, objY);
	}
	else {
		m = obj.matrix.rotate(rotateVal, objX, objY);
		//m.translate(objX, objY);
	}
	
	obj.animate({transform: m }, 250);
	//pointIn(id, rotateVal, false);
	//obj.transform(m);
	//obj.animate({ transform: 'r' + rotateVal + ',' + objX + ',' + objY }, 250, mina.easein);
	//obj.transform('r' + rotateVal + ',' + objX + ',' + objY);


	/*
	if(forever) {
		obj.animate({transform: m}, 50, function () {
			rotateVal = rotateVal + rotateInc;
			rotateClock(id, rotateVal, rotateInc, forever); // Repeat this animation so it appears infinite.
		});
	}
	else {
		obj.animate({transform: "r" + rotateVal + ',' + objX + ',' + objY}, 50);
	}*/
};
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
	var obj = s.select('#'+id);
	obj.attr({'x': xVal, 'y':  yVal});
};
var glideTo = function(id, time, x, y) {

	var obj = s.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	var newX = adjX + x;
	var newY = adjY + y;
	if(newX == objX && newY == objY)
	{
		return;
	}
	if(newX > maxX)
	{
		newX = maxX;
	}
	if(newY > maxY)
	{
		newY = maxY;
	}
	if(!obj.matrix)
	{
		m = new Snap.Matrix().translate(newX - objX, newY - objY);
	}
	else
	{
		m = new Snap.Matrix().translate(newX - objX, newY - objY).add(obj.matrix);
	}
	//var direction = obj.pointDir.value;
	obj.animate({ transform: m }, (time * 1000), mina.linear, function() {
		obj.attr({'x': newX, 'y':  newY});
		obj.transform(new Snap.Matrix());
		rotateClock(id, direction);
	});
}
var edgeBounce = function(id){
	var obj = s.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	if(maxX == objX || maxY == objY)
	{
		pointIn(id, obj.pointIn.value + 180, true);
	}
}

var pointIn = function (id, dir, setDirection) {
	var obj = document.getElementById(id);
	if(obj != null) {
		var pointDiff = parseInt(obj.attributes.pointDir) - dir;
		rotateClock(id, pointDiff, pointDiff);
		if(setDirection)
			obj.pointDir = dir;
		else
			obj.pointDir += dir;
	}
};