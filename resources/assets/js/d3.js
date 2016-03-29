var stage = d3.select("#svgStage");
var sprite = d3.select("#svgSprite");
var focused;

var mySquare= stage.append("rect")
  .attr("x",200)
  .attr("y",140)
  .attr("width",30)
  .attr("height",30)
	.attr("id", 's2')
	.attr("rotationDegree", 0)
	.attr("penDown", "false")
	.attr("rotationStyle", "all")
	//next 3 variables are for pen color
	.attr("colorDirection", 1)
	.attr("shadeDirection", 1)
	.attr("strokePen", d3.rgb("#00ADEF"))
	.attr("strokeSize", 4)
	
  .attr("pointDir", 0)
  .attr("pointDir", 0)
  .attr('fill', 'purple')
  .attr('stroke', 'black')
  .attr('stroke-width', 5);
var myCircle= stage.append("circle")
  .attr("cx", 100)
  .attr("cy", 70)
  .attr("r", 20)
  .attr("id", 'c2')
  .attr("rotationDegree", 0)
  .attr("penDown", "false")
  .attr("rotationStyle", "all")
  .attr("pointDir", 0)
  .attr('fill', 'purple')
  .attr('stroke', 'black')
  .attr('stroke-width', 5);
var miniSquare= sprite.append("rect")
  .attr("x",-75)
  .attr("y", 5)
  .attr("width",10)
  .attr("height",10)
  .attr("id", 'ms2')
  .attr("blockXML", "<XML></XML>")
  .attr('fill', 'purple')
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .on("click", function(){switchSprite(miniSquare);});

var miniCircle= sprite.append("circle")
  .attr("cx",-50)
  .attr("cy",10)
  .attr("r",5)
  .attr("id", 'mc2')
  .attr("blockXML", "<XML></XML>")
  .attr('fill', 'purple')
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .on("click", function(){switchSprite(miniCircle);});
focused = miniSquare;
var drag = d3.behavior.drag();
stage.call(drag);
var	maxX = stage.style.width; //TODO reset on resize
var maxY = stage.style.height;


var switchSprite = function(sprite)
{
	focused.attr({blockxml: Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(workspace))})
	focused = sprite;
	workspace.clear();
	Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(focused.attr('blockxml')));
}
//sets up the sprite to be dragged
var start = function() {
	//maxX = stage.node.width.baseVal.value;
	//maxY = stage.node.height.baseVal.value;
	this.ox = parseInt(this.attr("x"));
	this.oy = parseInt(this.attr("y"));
	spritex = this.ox;
	spritey = this.oy;
	console.log("Start move, ox=" + this.ox + ", oy=" + this.oy);

	var spriteLoc = calculateSpriteWindowPosition(this);
	diffx = mouseX - spriteLoc.x;
	diffy = mouseY - spriteLoc.y;
}

//comment
//Code writen with help from:
//http://stackoverflow.com/questions/21852543/svg-how-to-get-the-mouse-position-on-the-internal-matrix
var move = function(dx, dy, posX, posY) {
	pt.x = posX-diffx;
	pt.y = posY-diffy;

	var transformed = pt.matrixTransform(svg.getScreenCTM().inverse());
  if(this.type == 'circle')
		this.attr({ cx : transformed.x, cy : transformed.y });
	else
    this.attr({ x : transformed.x, y : transformed.y });
}

//controls how to update sprite location, and print to console after drag
var stop = function() {

	this.ox = parseInt(this.attr("x"));
	this.oy = parseInt(this.attr("y"));

	if(this.ox+stage.style.height <=0 || this.ox >=480||this.oy+stage.style.height<=0||this.oy>=360)
	{
		this.ox = spritex;
		this.oy = spritey;
		this.attr({"x": this.ox, "y": this.oy});
	}

    console.log("Stop move, ox=" + this.ox + ", oy=" + this.oy);

}
