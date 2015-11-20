var s = Snap("#svgArea");

//for different screen sizes, shows edge of working area
var maxX;
var maxY;
//current location of sprite
var spritex = 100;
var spritey = 100;


var bigCircle = s.circle(spritex, spritey, "5%");
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
    this.ox = parseInt(this.attr("cx"));
    this.oy = parseInt(this.attr("cy"));
	spritex = this.ox;
	spritey = this.oy;
    console.log("Start move, ox=" + this.ox + ", oy=" + this.oy);
}
//updates x,y value of sprite based on change
var move = function(dx, dy) {
	this.attr({"cx": this.ox + dx, "cy": this.oy + dy});
}
//controls how to update sprite location, and print to console after drag
var stop = function() {
	
	this.ox = parseInt(this.attr("cx"));
	this.oy = parseInt(this.attr("cy"));
	//checks it it is on the right or bottom of the screen
	if(this.ox-this.node.r.animVal.value >maxX || this.oy -this.node.r.animVal.value>maxY)
	{
		this.ox = spritex;
		this.oy = spritey;
		this.attr({"cx": this.ox, "cy": this.oy});
	}
	//checks if it is at the left or top side of the screen.
	if(this.ox+this.node.r.animVal.value <0 || this.oy+this.node.r.animVal.value <0)
	{
		this.ox = spritex;
		this.oy = spritey;
		this.attr({"cx": this.ox, "cy": this.oy});
	}
    console.log("Stop move, ox=" + this.ox + ", oy=" + this.oy);
}

bigCircle.drag(move, start, stop);