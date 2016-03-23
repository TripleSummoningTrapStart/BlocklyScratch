var stage = d3.select("#svgStage");
var sprite = d3.select("#svgSprite")

var mySquare= stage.append("rect")
  .attr("x",200)
  .attr("y",140)
  .attr("width",20)
  .attr("height",20)
	.attr("id", 'c2')
	.attr("rotationDegree", 0)
	.attr("penDown", "false")
	.attr("rotationStyle", "all")
  .attr("pointDir", 0);

var	maxX = stage.node.width.baseVal.value; //TODO reset on resize
var  maxY = stage.node.height.baseVal.value;
