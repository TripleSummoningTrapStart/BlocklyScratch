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
	var obj = s.select('#' + id);
	var dir = parseFloat(obj.attr("pointDir"));
	var oppSide = steps * Math.sin(dir); // y diff
	var adjSide = steps * Math.cos(dir); // x diff
	obj.attr({'x': parseInt(obj.attr('x')) + adjSide, 'y':  parseInt(obj.attr('y')) - oppSide});
	/*obj.transform("t" + adjSide + "," + oppSide);
	var boundingBox = obj.getBBox();
	boundingBox.cx += adjSide;
	boundingBox.cy += oppSide;*/
};
var rotateClock = function(id, rotateVal, rotateInc) {
		//TODO Should probably change to take Radians, maybe not
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

	//obj.animate({transform: m }, 50);
	obj.transform(m);

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
	var obj = document.getElementById(id);
	if (obj != null) {
		xVal = xVal ? xVal.data : obj.getAttribute("x");
		yVal = yVal ? yVal.data : obj.getAttribute("y");
		obj.attr({'x': xVal, 'y': yVal});
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
	var objX = x; //- parseInt(obj.attr('x'));
	var objY = y; //+ parseInt(obj.attr('y'));

	if(!obj.matrix)
	{
		m = new Snap.Matrix().translate(objX, objY);
	}
	else
	{
		m = obj.matrix.translate(objX, objY);
	}
	//obj.transform(m);
	obj.animate({ transform: m }, (time * 1000), mina.linear, function() {
		obj.attr({'x': parseInt(obj.attr('x')) + x, 'y':  parseInt(obj.attr('y')) + y});
		m = obj.matrix.translate((x * -1), (y * -1));
		obj.transform(m);
	});
}

var pointIn = function (id, dir) {
	var obj = s.select("#" + id);
	if(obj != null) {
		var dirRad = convertToRadians(dir);
		var pointDiffRad = parseFloat(obj.attr("pointDir")) - dirRad;
		var pointDiffDeg = convertToDegrees(pointDiffRad);
		//rotateClock(id, pointDiffDeg, pointDiffDeg);
		obj.attr("pointDir", dirRad);
	}
};
