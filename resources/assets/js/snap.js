var s = Snap("#svgArea");

var bigCircle = s.circle("30%","50%", "5%");
bigCircle.attr({
	fill: "green",
	stroke: "#000",
	strokeWidth:5
});
var square = s.rect(0,0, "90%","89.75%");
square.attr({
	fill: "#FFFFFF",
	fillOpacity: "0.0",
	stroke: "#000",
	strokeWidth:1
});
