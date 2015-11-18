var s = Snap("#svgArea");

//for different screen sizes, shows edge of working area
var maxX;
var maxY;
//current location of sprite
var spritex = 100;
var spritey = 100;

var square = s.rect(0,0, "90%","89.75%");
square.attr({
	fill: "#FFFFFF",
	fillOpacity: "0.0",
	stroke: "#000",
	strokeWidth:1
});

var bigCircle = s.circle(spritex, spritey, "5%");
bigCircle.attr({
	fill: "green",
	stroke: "#000",
	strokeWidth:5
});

var start = function() {
	maxX = square.node.width.baseVal.value;
	maxY = square.node.height.baseVal.value;
    this.ox = parseInt(this.attr("cx"));
    this.oy = parseInt(this.attr("cy"));
	spritex = this.ox;
	spritey = this.oy;
    console.log("Start move, ox=" + this.ox + ", oy=" + this.oy);
}

var move = function(dx, dy) {
	this.attr({"cx": this.ox + dx, "cy": this.oy + dy});
}

var stop = function() {
	
	this.ox = parseInt(this.attr("cx"));
	this.oy = parseInt(this.attr("cy"));
	if(this.ox+this.node.r.animVal.value >maxX || this.oy +this.node.r.animVal.value>maxY)
	{
		this.ox = spritex;
		this.oy = spritey;
		this.attr({"cx": this.ox, "cy": this.oy});
	}
	if(this.ox-this.node.r.animVal.value <0 || this.oy-this.node.r.animVal.value <0)
	{
		this.ox = spritex;
		this.oy = spritey;
		this.attr({"cx": this.ox, "cy": this.oy});
	}
    console.log("Stop move, ox=" + this.ox + ", oy=" + this.oy);
}

bigCircle.drag(move, start, stop);