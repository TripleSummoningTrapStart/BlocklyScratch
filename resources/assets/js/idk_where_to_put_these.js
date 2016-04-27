/* Method to convert the given degrees to radians
* @param degrees to be converted
*/
var convertToRadians = function(deg){
  return deg * Math.PI / 180;
};

/* Method to convert the given radians to degrees
* @param radians to be converted
*/
var convertToDegrees = function(rad){
  return rad * 180 / Math.PI;
};



/* Method to calculate the position of the sprite in the browser window */
var calculateSpriteWindowPosition = function(spr){
  return {x: document.getElementById(spr.node.id).getBoundingClientRect().left,
          y: document.getElementById(spr.node.id).getBoundingClientRect().top};
};

/* Method to add two matrices and return the SnapSVG Matrix */
var matrixAdd = function(matrixA, matrixB)
{
  return new Snap.Matrix(matrixA.a + matrixB.a, matrixA.b + matrixB.b, matrixA.c + matrixB.c, matrixA.d + matrixB.d, matrixB.e, matrixB.f)
}

/*Method to change a #color value to an array of hsv values
	@param color is the hex value of a given color
	@return an array of hue saturation and value values representing the given color*/
var RGBtoHSV = function(color)
{
	//var array = [0, 1, 2];
	var R = parseInt(color[1] + color[2], 16);
	var G = parseInt(color[3] + color[4], 16);
	var B = parseInt(color[5] + color[6], 16);
	var Rp = R/255.0;
	var Gp = G/255.0;
	var Bp = B/255.0;
	var Cmax = 0;
	var Cmin = 1;
	if(Rp>=Gp)
	{
		if(Rp>=Bp)
		{
			//red max
			Cmax = Rp;
		}
		else
		{
			//blue max
			Cmax = Bp;
		}
	}
	else
	{
		if(Gp>=Bp)
		{
			//Green Max
			Cmax = Gp;
		}
		else
		{
			//blue max
			Cmax = Bp;
		}
	}
	if(Rp<=Gp)
	{
		if(Rp<=Bp)
		{
			//red min
			Cmin = Rp;
		}
		else
		{
			//blue min
			Cmin = Bp;
		}
	}
	else
	{
		if(Gp<=Bp)
		{
			//Green Min
			Cmin = Gp;
		}
		else
		{
			//blue min
			Cmin = Bp;
		}
	}
	var delta = Cmax - Cmin;
	var H;
	if(delta == 0)
	{
		H = 0;
	}
	else if(Rp == Cmax)
	{
		H = 60*(((Gp-Bp)/delta)%6);
	}
	else if(Gp == Cmax)
	{
		H = 60*(((Bp-Rp)/delta)+2);
	}
	else
	{
		H = 60*(((Rp-Gp)/delta)+4);
	}
	while(H<0){
		H = 360+H;
	}
	while(H>360){
		H = H-360;
	}
	var S;
	if(Cmax==0)
	{
		S = 0;
	}
	else
	{
		S = delta/Cmax;
	}
	//change shade value

	var V = Cmax;
	var array = [H, S, V];
	return array;
}
/*changes array of hsv value (hue saturation and value) to an RGB hex number
	@param array of hsv values to convert to RGB
	@retun array of RGB vaules representing the given hsv values*/
var HSVtoRGB = function(hsv)
{
	var H = parseInt(hsv[0]);
	var S = parseFloat(hsv[1]);
	var V = parseFloat(hsv[2]);
	var C = V*S;
	var X = C*(1-Math.abs(((H/60)%2)-1));
	var m = V - C;
	var R, G, B, Rp, Gp, Bp;
	if(H<60)
	{
		Rp = C;
		Gp = X;
		Bp = 0;
	}
	else if(H<120)
	{
		Rp = X;
		Gp = C;
		Bp = 0;
	}
	else if(H<180)
	{
		Rp = 0;
		Gp = C;
		Bp = X;
	}
	else if(H<240)
	{
		Rp = 0;
		Gp = X;
		Bp = C;
	}
	else if(H<300)
	{
		Rp = X;
		Gp = 0;
		Bp = C;
	}
	else
	{
		Rp = C;
		Gp = 0;
		Bp = X;
	}
	R = parseInt((Rp+m)*255);
	G = parseInt((Gp+m)*255);
	B = parseInt((Bp+m)*255);
	var r1;
	if(R<16)
	{
		r1 = '0'+R.toString(16);
	}
	else
	{
		r1 = R.toString(16);
	}
	var g1;
	if(G<16)
	{
		g1 = '0'+G.toString(16);
	}
	else{
		g1 = G.toString(16);
	}
	var b1;
	if(B<16){
		b1 = '0'+B.toString(16);
	}
	else{
		b1 = B.toString(16);
	}
	return [r1, g1, b1];
};

window.onload = function() {
	loadAllBlocks();
	injectBlockly();
	registerButtons();
  //stage.clear();
  //sprite.clear();
  //addSprites();
};

var rotateWithoutAnimation = function(obj) {
  var objX = parseInt(obj.attr('x')) + parseInt(obj.attr('width')/2);
  var objY = parseInt(obj.attr('y')) + parseInt(obj.attr('height')/2);
  var rotationStyle = obj.attr('rotationStyle');
  var rotationDegree = parseInt(obj.attr('rotationDegree'));
  if(rotationStyle == 'NONE')
  {
      return;
  }
  obj.attr("transform", "rotate(" + rotationDegree +"," + objX + "," + objY +")");
};

var drawSquare = function(obj, changeX, changeY){

    var boundingBox = obj.node().getBBox();
    var lineY = parseInt(boundingBox.y) + parseInt(boundingBox.height/2);
    var xAdj = parseInt(boundingBox.width/2);
    var lineX = parseInt(boundingBox.x) + parseInt(boundingBox.width/2);
    var yAdj = parseInt(boundingBox.height/2);
    var l = stage.append("line")
                  .attr("id", "draw")
                  .attr("x1", lineX)
                  .attr("y1", lineY)
                  .attr("x2", lineX + changeX)
                  .attr("y2", lineY + changeY)
                  .attr("stroke",  obj.attr('strokePen'))
                  .attr("stroke-width", obj.attr('strokeSize'));
      obj.moveToFront();
}
var submit = function(){
  textSubmitted = true;
}
var setInAnim = function(obj, inAnim){
  obj.attr("inAnim", inAnim)
};