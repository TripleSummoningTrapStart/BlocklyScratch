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
	var obj = stage.select('#' + id);
	var dir = parseFloat(obj.attr("pointDir"));
	var oppSide = steps * Math.sin(dir); // y diff
	var adjSide = steps * Math.cos(dir); // x diff
	obj.attr({'x': parseInt(obj.attr('x')) + adjSide, 'y':  parseInt(obj.attr('y')) - oppSide});
	/*obj.transform("t" + adjSide + "," + oppSide);
	var boundingBox = obj.getBBox();
	boundingBox.cx += adjSide;
	boundingBox.cy += oppSide;*/
};

var rotateClock = function(id, rotateVal) {
		//TODO Should probably change to take Radians, maybe not
	/*  if(rotateVal > 0 && rotateVal > 360)
		{
			rotateVal -= 360;
		}
		else if(rotateVal < 0 && Math.abs(rotateVal) > 360)
		{
			rotateVal += 360;
		}*/
	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x')) + parseInt(obj.attr('width')/2);
	var objY = parseInt(obj.attr('y')) + parseInt(obj.attr('height')/2);
	var rotationStyle = obj.attr('rotationStyle');
	var rotationDegree = parseInt(obj.attr('rotationDegree'));
	var radians = convertToRadians(rotateVal);

	if(rotationStyle == 'LtoR'){
		if((rotationDegree + rotateVal) % 180 > 90)
		{
			rotateVal = 180;
			rotationDegree = 0;
		}
		else
		{
				obj.attr({'rotationDegree': parseInt(rotationDegree + rotateVal)});
				return;
		}
	}
	else if(rotationStyle == 'NONE')
	{
		return;
	}
	var m;
	if(!obj.matrix)	{
	  //m = new Snap.Matrix(Math.cos(radians), Math.sin(radians), Math.sin(radians) * -1, Math.cos(radians), objX, objY);//.translate(0,0);//.translate(objX, objY);
		//m = new Snap.Matrix(1,1,1,1,1,1).add(new Snap.Matrix(1,1,1,1,1,1));
		//m = new Snap.Matrix(Math.cos(radians), Math.sin(radians), Math.sin(radians) * -1, Math.cos(radians), objX, objY);
		m = new Snap.Matrix().rotate(rotateVal, objX, objY);//.translate(objX, objY);
	}
	else {
		//	m = new Snap.Matrix().translate(objX * -1, objY * -1).add(Math.cos(radians), Math.sin(radians), Math.sin(radians) * -1, Math.cos(radians), 0,0).translate(objX, objY);
		m = obj.matrix.rotate(rotateVal, objX, objY);
		//m.translate(objX, objY);
	}

	obj.animate({transform: m }, 250);
	obj.attr({'rotationDegree': parseInt(rotationDegree + rotateVal)});
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
	var obj = stage.select('#'+id);
	obj.attr({'x': xVal, 'y':  yVal});
};

var gotoMouse = function(id){
	var obj = stage.select('#' + id);
	var maxX = stage.node.width.baseVal.value;
	var maxY = stage.node.height.baseVal.value;
	var newX = mouseX;
	var newY = mouseY;
	if(mouseX > maxX){
		newX = maxX;
	}
	else if (mouseX < 0){
		newX = 0;
	}
	if(mouseY > maxY){
		newY = maxY;
	}
	else if(mouseY < 0){
		newY = 0;
	}
	console.log("x: " + newX + ", y:" + newY);
	obj.attr({'x': newX, 'y': newY - 250});
};

var glideTo = function(id, time, x, y) {

	var obj = stage.select('#'+id);
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
	Snap.animate({ transform: m }, (time * 1000), mina.linear, function() {
		obj.attr({'x': newX, 'y':  newY});
		obj.transform(new Snap.Matrix());
		//rotateClock(id, direction);
	});
}
var edgeBounce = function(id){
	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	if(maxX == objX || maxY == objY)
	{
		pointIn(id, obj.pointIn.value + 180, true);
	}
};

var pointIn = function (id, dir, setDirection) {
	var obj = stage.select("#" + id);
	if(obj != null)
	{
		var dirRad = convertToRadians(dir);
		var pointDiffRad = parseFloat(obj.attr("pointDir")) - dirRad;
		var pointDiffDeg = convertToDegrees(pointDiffRad);
		var rotateStyle = obj.attr('rotateStyle');
		if(rotateStyle == 'NONE' || (rotateStyle == 'LtoR' && (dir != 0 || dir != 180)))
			return;
		else
		{
			rotateClock(id, pointDiffDeg);
			obj.attr("pointDir", dirRad);
				obj.pointDir += dir;
		}
	}
};

var pointTowardsMouse = function(spriteID){
	var spr = stage.select("#" + spriteID);
	var mX = convertToRadians(mouseX);
	var mY = convertToRadians(mouseY);
	var points = calculateSpriteWindowPosition(spr); // Should return a tuple
	var xDif = (mX + convertToRadians(points.x));
	var yDif = (mY + convertToRadians(points.y) - convertToRadians(50));
	var pointDir = Math.atan(yDif/xDif);
	if(pointDir < 0) { // quadrants 2 & 4
		if (xDif < 0) { // quadrant 2
			pointDir += Math.PI;
		}
		else { // quadrant 4
			pointDir += 2 * Math.PI;
		}
	}
	else { // quadrants 1 & 3
		if (xDif < 0 && yDif < 0) { // quadrant 3
			pointDir += Math.PI
		}
		// do nothing for quadrant 1
	}

/*
	switch (true) {
		case(pointDir < 0): // quadrant 2 & 4

			break;
		case (xDif < 0):
			pointDir += Math.PI;
			break;
		case (yDif > 0):
			pointDir += 2 * Math.PI;
			break;
		default: // yDif < 0 and xDif > 0
			// do nothing
	}
*/
	pointIn(spriteID, convertToDegrees(pointDir), true);
};

var setRotationStyle = function(id, rotateStyle)
{
	var obj = stage.select("#"  + id);
	if(obj != null){
		obj.attr({'rotateStyle': rotateStyle});
	}
}
