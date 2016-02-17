var svg = $('#svgStage')[0];
var stage = Snap("#svgStage");
var sprite = Snap("#svgSprite");
var pt = svg.createSVGPoint();
var focused;

//for different screen sizes, shows edge of working area
var maxX = stage.node.width.baseVal.value;
var maxY = stage.node.height.baseVal.value;
//current location of sprite
var spritex = (maxX/2) - 30;
var spritey = maxY/2;


//testing somethign new
var diffx;
var diffy;
//
/*var arrow = stage.paper.polygon([200, 110, 250,160, 200,210]);
arrow.attr({
	fill: "green",
	stroke: "#000",
	strokeWidth: 3,
	id: "a1",
	pointDir: 0 // Needs to be in Radians for Math.<trigfunction>
});*/
var switchSprite = function()
{
	focused.attr({blockXML: Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(workspace))})
	focused = this;
	workspace.clear();
	Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(focused.attr('blockXML')));

}

var bigCircle = stage.rect(200, 140, 40, 40);

bigCircle.attr({
	fill: "green",
	stroke: "#000",
	strokeWidth:5,
	id: "c2",
	pointDir: 0, // Needs to be in Radians for Math.<trigfunction>
	rotateStyle: "all",
	rotationDegree: 0
});
var smallCircle = bigCircle.clone();
smallCircle.attr({
	strokeWidth: 1,
	id: "smallc2",
	x: -50,
	y: 2,
	height: 10,
	width: 10,
	blockXML: "<XML></XML>"
});
sprite.append(smallCircle);
smallCircle.click(switchSprite);

var bigSQ = stage.circle(100, 100, 40);
bigCircle.attr({
	fill: "green",
	stroke: "#000",
	strokeWidth:5,
	id: "s2",
	pointDir: 0, // Needs to be in Radians for Math.<trigfunction>
	rotateStyle: "all",
	rotationDegree: 0
});
var smallSQ = bigSQ.clone();
smallSQ.attr({
	strokeWidth: 1,
	id: "smalls2",
	cx: -25,
	cy: 7.5,
	r: 7.5,
	blockXML: "<XML></XML>"
});
sprite.append(smallSQ);
smallSQ.click(switchSprite);
focused = smallCircle;



//sets up the sprite to be dragged
var start = function() {
	maxX = stage.node.width.baseVal.value;
	maxY = stage.node.height.baseVal.value;
  this.ox = parseInt(this.attr("x"));
  this.oy = parseInt(this.attr("y"));
	spritex = this.ox;
	spritey = this.oy;
	console.log("Start move, ox=" + this.ox + ", oy=" + this.oy);

	var diffs = calculateSpriteWindowPosition(this);
	diffx = diffs.x;
	diffy = diffs.y;
}


//Code writen with help from:
//http://stackoverflow.com/questions/21852543/svg-how-to-get-the-mouse-position-on-the-internal-matrix
var move = function(dx, dy, posX, posY) {
	pt.x = posX-diffx;
	pt.y = posY-diffy;

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

var importSVGImage = function(contents)
{

}
var cloneSVG = function(svg)
{

}
/*arrow.drag(move, start, stop);*/
