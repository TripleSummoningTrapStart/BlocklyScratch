var svg = $('#svgArea')[0];
var s = Snap("#svgArea");
var pt = svg.createSVGPoint();

//for different screen sizes, shows edge of working area
var maxX = s.node.width.baseVal.value;
var maxY = s.node.height.baseVal.value;
//current location of sprite
var spritex = (maxX/2) - 30;
var spritey = maxY/2;


//testing somethign new
var diffx;
var diffy;
//
/*var arrow = s.paper.polygon([200, 110, 250,160, 200,210]);
arrow.attr({
	fill: "green",
	stroke: "#000",
	strokeWidth: 3,
	id: "a1",
	pointDir: 90
});*/

var bigCircle = s.rect(200, 140, 40, 40);
bigCircle.attr({
	fill: "green",
	stroke: "#000",
	strokeWidth:5,
	id: "c2"
});

//sets up the sprite to be dragged
var start = function() {
	maxX = s.node.width.baseVal.value;
	maxY = s.node.height.baseVal.value;
    this.ox = parseInt(this.attr("x"));
    this.oy = parseInt(this.attr("y"));
	spritex = this.ox;
	spritey = this.oy;
    console.log("Start move, ox=" + this.ox + ", oy=" + this.oy);
	
	diffx = pt.x - bigCircle.x;
	diffy = pt.y - bigCircle.y;
}


//Code writen with help from:
//http://stackoverflow.com/questions/21852543/svg-how-to-get-the-mouse-position-on-the-internal-matrix
var move = function(dx, dy, posX, posY) {
	pt.x = posX-20;
	pt.y = posY-20;
	
	//this.attr({"x": this.ox+dx, "y": this.oy+dy});
	
	var transformed = pt.matrixTransform(svg.getScreenCTM().inverse());
    bigCircle.attr({ x : transformed.x, y : transformed.y });
}

//controls how to update sprite location, and print to console after drag
var stop = function() {
	
	this.ox = parseInt(this.attr("x"));
	this.oy = parseInt(this.attr("y"));
	
	if(this.ox+this.node.width.baseVal.value <=0 || this.ox >=480||this.oy+this.node.height.animVal.value<=0||this.oy>=360)
	{
		this.ox = spritex;
		this.oy = spritey;
		this.attr({"x": this.ox, "y": this.oy});
	}
	

    console.log("Stop move, ox=" + this.ox + ", oy=" + this.oy);
}

bigCircle.drag(move, start, stop);