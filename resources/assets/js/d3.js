var stage = d3.select("#svgStage");
var sprite = d3.select("#svgSprite")

var mySquare= stage.append("rect")
  .attr("x",200)
  .attr("y",140)
  .attr("width",40)
  .attr("height",40)
	.attr("id", 'c2')
	.attr("rotationDegree", 0)
	.attr("penDown", "false")
  .attr("strokeSize", 4)
	.attr("strokePen", d3.rgb("#00ADEF"))
	.attr("rotationStyle", "all")
  .attr("pointDir", 0)
  .attr("fill", "purple")
  .attr("stroke", "black")
  .attr("stroke-width", 5);

var	maxX = stage.node.width.baseVal.value; //TODO reset on resize
var  maxY = stage.node.height.baseVal.value;
