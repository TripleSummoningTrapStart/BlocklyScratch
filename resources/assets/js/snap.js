var s = Snap("#svgArea");

//for different screen sizes, shows edge of working area
var maxX = s.node.width.baseVal.value;
var maxY = s.node.height.baseVal.value;
//current location of sprite
var spritex = (maxX/2) - 30;
var spritey = maxY/2;


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
}
//updates x,y value of sprite based on change
var move = function(dx, dy) {
	this.attr({"x": this.ox + dx, "y": this.oy + dy});
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