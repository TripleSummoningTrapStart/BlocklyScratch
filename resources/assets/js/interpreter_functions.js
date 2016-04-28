var adjX = 200; // the adjusted X value of the sprite to support a cartesian coordinate plane
var adjY = 140; // the adjusted Y value of the sprite to support a cartesian coordinate plane
var cloneCount = 0

/*This fu nction takes in a text input from the print block to add to the text area
 located in the console tab
 @param: the text to add */
var addConsoleText = function(text) {
	var textarea = document.getElementById("textArea");
	textarea.innerHTML += text + '&#13;&#10;';
	textarea.scrollTop = textarea.scrollHeight;
};

/*this function is called to highlight each individual block when pressing step to
	step through the code.
	@param: the id of the block to highlight */
var highlightBlock = function(id) {
	workspace.highlightBlock(id);
	highlightPause = true;
};

/*this function is called by the moveSteps block to move the specified sprite in
  the direction it is facing by the specified number of steps.
	@param: the id of the sprite
	@param: the number of pixels to move the sprite */

var moveStep = function(id, steps) {
	var obj = stage.select('#' + id);
	while(getInAnim(id)){};
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	var dir = convertToRadians(parseFloat(obj.attr("rotationDegree"))) * -1
	var oppSide = steps * Math.sin(dir); // y diff
	var adjSide = steps * Math.cos(dir); // x diff
	if(obj.attr('penDown') == "true")
			SVGAreas.drawSquare(obj, adjSide, oppSide *-1);
	obj.attr('transform', '');
	obj.attr({'x': objX + adjSide, 'y':  objY - oppSide});
		rotateWithoutAnimation(obj);
};

/* this function is called by the both the rotateClockwise and rotateCounterClockwise
   blocks to rotate the specified by given rotate value
	@param: the id of the sprite
	@param: the number of degrees to rotate the sprite (negative if counter cloackwise) */
var rotate = function(id, rotateVal) {
		//TODO Should probably change to take Radians, maybe not

	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x')) + parseInt(obj.attr('width')/2);
	var objY = parseInt(obj.attr('y')) + parseInt(obj.attr('height')/2);
	var rotationStyle = obj.attr('rotationStyle');
	var rotationDegree = parseInt(obj.attr('rotationDegree'));
		if(rotationStyle == 'LtoR'){
			if((rotationDegree + rotateVal) % 180 > 90){
				rotateVal = 180;
				rotationDegree = 0;
			}
			else{
					obj.attr({'rotationDegree': parseInt(rotationDegree + rotateVal)});
					return;
			}
		}
		else if(rotationStyle == 'NONE')
			return;
	  obj.attr("inAnim", 'true');
		obj.transition()
			.ease("linear")
			.attrTween("transform", tween)
			.duration(100)
			.each("end", setInAnim(obj, 'false'));

		function tween(d, i, a) {
			return d3.interpolateString("rotate(" + rotationDegree +"," + objX + "," + objY +")",
														"rotate("+ (rotationDegree + rotateVal) +"," + objX + "," + objY +")");
		}
		obj.attr("rotationDegree", (rotationDegree + rotateVal));
		//pointIn(id, rotateVal, false);

};
/* this function is called by the setY block to set the X value of the specified sprite
   to the new value passed int
	@param: the id of the sprite
	@param: the new X value */
var setX = function (id, newVal) {
	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var newX = adjX + newVal;
	if(newX == objX)
		return;
	if(newX > maxX)
		newX = maxX;
	if(obj.attr('penDown') == 'true')
		SVGAreas.drawSquare(obj, newX-objX, 0);
	obj.attr('transform', '');
	obj.attr({'x': newX});
  rotateWithoutAnimation(obj);
};

/* this function is called by the setX block to set the Y value of the specified sprite
   to the new value passed int
	@param: the id of the sprite
	@param: the new Y value */
var setY = function (id, newVal) {
	var obj = stage.select('#'+id);
	var objY = parseInt(obj.attr('y'));
	var newY = adjY + (newVal * -1);
	if(newY == objY)
		return;
	if(newY > maxY)
		newY = maxY
	if(obj.attr('penDown') == 'true')
		SVGAreas.drawSquare(obj, 0, newY - objY);
  obj.attr('transform', '');
	obj.attr({'y': newY});
  rotateWithoutAnimation(obj);
};

/* this function is called by the changeX block to change the X value of the specified sprite
   by adding the new value to the old value
	@param: the id of the sprite
	@param: the value to change X by */
var changeX = function (id, changeVal) {
	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var newX = changeVal + objX;
		if(newX == objX)
			return;
		if(newX > maxX)
			newX = maxX;
		if(obj.attr('penDown') == 'true')
			SVGAreas.drawSquare(obj, changeVal, 0);
	  obj.attr('transform', '');
		obj.attr({'x': newX});
	  rotateWithoutAnimation(obj);
};

/* this function is called by the changeY block to change the Y value of the specified sprite
   by adding the new value to the old value
	@param: the id of the sprite
	@param: the value to change Y by */
var changeY = function (id, changeVal) {
	var obj = stage.select('#'+id);
	var objY = parseInt(obj.attr('y'));
	var newY = (changeVal * -1) + objY;
	if(newY == objY)
		return;
	if(newY > maxY)
		newY = maxY;
	if(obj.attr('penDown') == 'true')
			SVGAreas.drawSquare(obj, 0, changeVal);
	obj.attr('transform', '');
	obj.attr({'y': newY});
	rotateWithoutAnimation(obj);
};

/* this function is called by the GotoXY block to change the X and Y value of
   the specified block to the new values given
	@param: the id of the sprite
	@param: the value to change X to
	@param: the value to change Y to*/
var gotoXY = function (id, xVal, yVal) {
	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	var newX = adjX + xVal;
	var newY = adjY + (yVal*-1);
	if(newX == objX && newY == objY)
		return;
	if(newX > maxX)
		newX = maxX;
	if(newY > maxY)
		newY = maxY;
	if(obj.attr('penDown') == 'true')
		SVGAreas.drawSquare(obj, newX - objX, newY - objY);
	//if(obj.attr('transform') != null)	{
		obj.attr('transform', '');
		obj.attr({'x': newX, 'y': newY});
		rotateWithoutAnimation(obj);
	//}
	/*else
		{
			obj.transition().attrTween('x', tweenX).attrTween('y', tweenY);
			function tweenX(d, i, a) {
				return d3.interpolateString(objX, newX);
			}
			function tweenY(d, i, a) {
				return d3.interpolateString(objY, newY);
			}
	}*/

};


/* this function is called by the Go to Mouse block to change the X and Y value of
   the specified block to the current location of the mouse
	@param: the id of the sprite*/
var gotoMouse = function(id){
	var obj = stage.select('#' + id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	var box = obj.node().getBBox();
	var newX = mouseX - 5;
	var newY = mouseY - 184;
	if(newX > maxX)
		newX = maxX;
	else if (newX < 0)
		newX = 0;
	if(newY > maxY)
		newY = maxY;
	else if(newY < 0)
		newY = 0;
	console.log("x: " + newX + ", y:" + newY);
	if(obj.attr('penDown') == 'true')
		SVGAreas.drawSquare(obj, newX - objX, newY - objY);
	obj.attr('transform', '');
	obj.attr({'x': newX, 'y': newY});
	rotateWithoutAnimation(obj);
};

/* this function is called by the glideTo block to change the X and Y value of
   the specified block to the new values given over a specified amount of time
	@param: the id of the sprite
	@param: the time to animate the sprite in seconds
	@param: the value to change X to
	@param: the value to change Y to */
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
	obj.transition().attr("x", newX).attr("y", newY).duration(time*1000);
}

/* this function is called by the If on Edge Bounce block to change the direction
   the specified sprite is facing if it is touching the edge.
	@param: the id of the sprite */
var edgeBounce = function(id){
	var obj = stage.select('#'+id);
	var objX = parseInt(obj.attr('x'));
	var objY = parseInt(obj.attr('y'));
	if(maxX <= objX || maxY <= objY)
	{
		pointIn(id, obj.pointIn + 180, true);
	}
};

/* this function is called by the Point In block to change the point direction attribute
   a sprite and possibly rotate it. This function is also called as a helper method for
	 other functions
	@param: the id of the sprite
	@param: direction to point the sprite
	@param: boolean specifying whether the direction is being set */
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
			rotate(id, pointDiffDeg);
			obj.attr("pointDir", dirRad);
			obj.pointDir += dir;
		}
	}
};

/* this function is called by the pointIn block to point the specified sprite
	 in the direction of the mouse
	 @param: the id of the sprite */
var pointTowardsMouse = function(spriteID){
	var spr = stage.select("#" + spriteID);
	var points = calculateSpriteWindowPosition(spr); // Should return a tuple
	var xDif = (points.x - mouseX);
	var yDif = (points.y - mouseY - 100);
	console.log("mouseX: " + mouseX);
	console.log("mouseY: " + mouseY);
	console.log("points.x: " + points.x);
	console.log("points.y: " + points.y);
	console.log("xDif: " + xDif);
	console.log("yDif: " + yDif);
	var pointDir = Math.atan(yDif/xDif);
	console.log("pointDir Original: " + pointDir);
	if(pointDir < 0) { // quadrants 2 & 4
		if (xDif < 0) { // quadrant 4
			pointDir += 2 * Math.PI;
		}
		else { // quadrant 2
			pointDir -= Math.PI / 1.5;
		}
	}
	else if (xDif < 0 && yDif < 0) { // quadrant 3
			pointDir += Math.PI;
	}
		// do nothing for quadrant 1
	pointDir += (Math.PI / 3); // offset needed for all quadrants (I don't know why)
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
	var v = convertToDegrees(pointDir);
	console.log("Radians: " + pointDir + "\nDegrees: " + v);
	pointIn(spriteID, convertToDegrees(pointDir), true);
};

/* this function is called by the Set Rotation Style Block to set the rotation style
   attribute of the specified sprite
	@param: the id of the sprite
	@param: the specific rotation style given by the list in the block */
var setRotationStyle = function(id, rotateStyle) {
	var obj = stage.select("#"  + id);
	if(obj != null){
		obj.attr({'rotateStyle': rotateStyle});
	}
}
//Pen functions

/*this function sets the value of penDown to be true for a given sprite, when a pen down block is present
	@param: the id of the sprite that is activate*/
var penDown = function(id) {
	var obj = stage.select("#"+id);
		obj.attr({'penDown': 'true'});
}
/*this function sets the value of penDown to be false for a given sprite, when a pen up block is present
	@param: the id of the sprite that is activate*/
var penUp = function(id) {
	var obj = stage.select("#"+id);
		obj.attr({'penDown': 'false'});
}

/* This function sets the color of the pen to a certian numeric value
	@param: the id of the sprite that is active
	@param: the size to set the color of the pen to be */
var setColorByNumber = function(id, x) {
	var obj = stage.select('#'+id);
	var color = obj.attr('strokePen');
	var hsv = RGBtoHSV(color);
	var H = parseInt(hsv[0]);
	var S = parseFloat(hsv[1]);
	var V = parseFloat(hsv[2]);
	//V = x/100;
	if(x<0)
	{
		H = 0;
	}
	else if(x>360)
	{
		H =360;
	}
	else
	{
		H = x;
	}
	hsv = [H, S, V];
	var rgb = HSVtoRGB(hsv);
	var r1 = rgb[0];
	var g1 = rgb[1];
	var b1 = rgb[2];
	var Hex = '#'+r1+g1+b1;
	obj.attr({strokePen: d3.rgb(Hex)});
}
/* This function sets the color of the pen to a certian color, decided by color block
	@param: the id of the sprite that is active
	@param: the size to set the color of the pen to be */
var setColorByColor = function(id, h, s, v) {
	var obj = stage.select('#'+id);
	//obj.attr({strokePen: x});
	var hsv = [h, s, v];
	var rgb = HSVtoRGB(hsv);
	var r1 = rgb[0];
	var g1 = rgb[1];
	var b1 = rgb[2];
	var Hex = '#'+r1+g1+b1;
	obj.attr({strokePen: d3.rgb(Hex)});
}

/*This function changes the color of the pen by a set amount
	@param the id of the sprite whose pen color is changing
	@param the amount to change the pen color by
*/
var changeColor = function(id, dx) {
	var obj = stage.select('#' + id);
	var color = obj.attr('strokePen');
	var hsv = RGBtoHSV(color);
	var H = parseInt(hsv[0]);
	var S = parseFloat(hsv[1]);
	var V = parseFloat(hsv[2]);
	//V = x/100;
	if(dx<-360)
	{
		H = H+obj.attr('colorDirection')*(parseInt(dx)%-360);
	}
	else if(dx>360)
	{
		H =H + obj.attr('colorDirection')*(parseInt(dx)%360);
	}
	else
	{
		H = H+obj.attr('colorDirection')*parseInt(dx);
	}
	if(H<0)
	{
		H = 0-H;
	}
	else if(H>360)
	{
		H = H - (H%360);
	}
	hsv = [H, S, V];
	var rgb = HSVtoRGB(hsv);
	var r1 = rgb[0];
	var g1 = rgb[1];
	var b1 = rgb[2];
	var Hex = '#'+r1+g1+b1;
	obj.attr({strokePen: Hex});

}

/* This function sets the shade of the pen to a certian value
	@param: the id of the sprite that is active
	@param: the size to set the shade of the pen to be */
var setShade = function(id, x) {
	var obj = stage.select('#'+id);
	var color = obj.attr('strokePen');
	var hsv = RGBtoHSV(color);
	var H = parseInt(hsv[0]);
	var S = parseFloat(hsv[1]);
	var V = parseFloat(hsv[2]);
	//V = x/100;
	if(x<0)
	{
		V = 0.0;
	}
	else if(x>100)
	{
		V =1.0;
	}
	else
	{
		V = x/100;
	}
	hsv = [H, S, V];
	var rgb = HSVtoRGB(hsv);
	var r1 = rgb[0];
	var g1 = rgb[1];
	var b1 = rgb[2];
	var Hex = '#'+r1+g1+b1;
	obj.attr("strokePen", d3.rgb(Hex));
};

/* This function changes the shade of the pen to a certian value, if value goes below 0, or above 1-
it switches the direction that the shade is changing by.  0 is for close to black, 1 is for close to white.
	@param: the id of the sprite that is active
	@param: the size to set the shade of the pen to be */
var changeShade = function(id, dx) {
	var obj = stage.select('#' + id);
	var color = obj.attr('strokePen');
	var hsv = RGBtoHSV(color);
	var H = hsv[0];
	var S = hsv[1];
	var V = parseFloat(hsv[2]);
	if(parseInt(dx)>100)
	{
		dx = parseInt(dx)%100;
	}
	var V = V+ obj.attr('shadeDirection')*(parseInt(dx)/100);
	if(V<0)
	{
		V = 0-V;
		obj.attr({shadeDirection: 1});
	}
	else if(V>1)
	{
		V = 1-(V%1);
		obj.attr({shadeDirection: -1});
	}
	hsv = [H, S, V];
	var rgb = HSVtoRGB(hsv);
	var r1 = rgb[0];
	var g1 = rgb[1];
	var b1 = rgb[2];
	var Hex = '#'+r1+g1+b1;
	obj.attr("strokePen", d3.rgb(Hex));
};

/* This functions sets the size of the pen to be x
	@param: the id of the sprite that is active
	@param: the size to set the pen to be */
var setSize = function(id, x) {
	var obj = stage.select('#' + id);
	obj.attr("strokeSize", x);
};
/* This functions changes the size of the pen by a set amount
	@param: the id of the sprite that is active
	@param: the amount to change the size by */
var changeSize = function(id, dx) {
	var obj = stage.select('#' + id);
	x = obj.attr('strokeSize');
	obj.attr("strokeSize", parseInt(x)+dx);
};

/* This function prompts the user for input
*/
var inputPrompt = function(id, msg) {
	var obj = stage.select("#" + id);
	var consoleIn = document.getElementById('consoleInput');
	consoleIn.style.display='';
	addConsoleText(msg);
	consoleIn.focus();
	consoleIn.select();
 	//return consoleIn.value;
	//addConsoleText(v);
};
var getTextSubmitted = function(){
	return textSubmitted;
}
var resetTextSubmitted = function(){
	textSubmitted = false;
}
var getInAnim = function(id){
	return stage.select("#" + id).attr("inAnim") == "true";
}
var submitAndResetTextArea = function(){
	var consoleIn = document.getElementById('consoleInput');
	consoleIn.style.display='none';
	return consoleIn.value
}

var stamp = function(id)
{
	var selection = stage.select('#'+id);
	//var obj = stage.select('#' + id).clone();
	var attr = selection.node().attributes;
	cloneCount = cloneCount + 1
	//var stage2 = Snap("#svgStage");
	//var obj = stage2.rect(attr[0].value, attr[1].value, attr[2].value, attr[3].value);
	stage.append("rect")
	.attr("x", attr['x'].value)
	.attr("y", attr['y'].value)
	.attr("width", attr['width'].value)
	.attr("height", attr['height'].value)
	.attr('fill', attr['fill'].value)
	.attr('stroke', attr['stroke'].value)
	.attr('stroke-width', attr['stroke-width'].value)
	.attr('rotationDegree', attr['rotationDegree'].value)
	.attr('id', "clone" + cloneCount);
	rotateWithoutAnimation(stage.select('#clone' + cloneCount));
	selection.moveToFront();
}

var clearPenLines = function(){
	stage.selectAll("#draw").remove()
}

var clearConsole = function(){
  var textarea = document.getElementById("textArea");
  textarea.innerHTML = "";
};

var submit = function(){
  textSubmitted = true;
};

var setInAnim = function(obj, inAnim){
  obj.attr("inAnim", inAnim)
};
