var svg = $('#svgStage')[0];
var svg2 = $('#svgSprite')[0];
var stage = Snap("#svgStage");
var sprite = Snap("#svgSprite");
var pt = svg.createSVGPoint();
var focused;
var spriteList = [];//TODO put into cache
var stageList = [];//TODO put into cache
var spriteXoffset = -85;
var spriteYoffset = 2;

//for different screen sizes, shows edge of working area
var maxX;
var maxY;


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
	focused.attr({blockxml: Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(workspace))})
	focused = this;
	workspace.clear();
	Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(focused.attr('blockxml')));

}

var bigCircle = stage.rect(200, 140, 40, 40);

bigCircle.attr({
	fill: "green",
	stroke: "#000",
	strokeWidth:5,
	id: "c2",
	pointDir: 0, // Needs to be in Radians for Math.<trigfunction>
	rotateStyle: "all",
	rotationDegree: 0,
	penDown: false,
	strokeSize: 4,
	strokePen: "#00ADEF",
	shadeDirection: 1,
	colorDirection: 1
});
var smallCircle = bigCircle.clone();
smallCircle.attr({
	strokeWidth: 1,
	id: "smallc2",
	x: spriteXoffset,
	y: spriteYoffset,
	height: bigCircle.attr('height')/3,
	width: bigCircle.attr('width')/3,
	blockxml: '<XML></XML>'
});
spriteXoffset += parseInt(smallCircle.attr('width'));
//sprite.append(smallCircle);
smallCircle.click(switchSprite);

var bigSQ = stage.circle(100, 100, 30);
bigSQ.attr({
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
	r: 8,
	cx: spriteXoffset + parseInt(smallSQ.attr('r')/2),
  cy: 9.5,
	blockxml: '<XML></XML>'
});
//sprite.append(smallSQ);
spriteXoffset = spriteXoffset + parseInt(smallSQ.attr('r'));
smallSQ.click(switchSprite);
focused = smallCircle;
stageList.push(bigCircle);
spriteList.push(smallCircle);
stageList.push(bigSQ);
spriteList.push(smallSQ);


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

	if(this.ox+stage.node.width.baseVal.value <=0 || this.ox >=480||this.oy+stage.node.height.animVal.value<=0||this.oy>=360)
	{
		this.ox = spritex;
		this.oy = spritey;
		this.attr({"x": this.ox, "y": this.oy});
	}

    console.log("Stop move, ox=" + this.ox + ", oy=" + this.oy);

}

//bigCircle.drag(move, start, stop);

var importSVG = function(contents, clone)
{
	  var substr = contents.substring(contents.indexOf('id="')).replace('id="','');
	  var id = substr.substring(0, substr.indexOf('"'));
		var image = Snap.parse(contents);
	  stage.append(image);
		var temp = stage.select("#" + id);

		temp.drag(move, start, stop);
		stageList.push(temp);
		if(clone)
		{
			temp.attr({'height': 100, 'width': 100});
			cloneSVG(temp, id);
		}

}
var addToSpriteArea = function(contents)
{
	  var substr = contents.substring(contents.indexOf('id="')) .replace('id="','');
	  var id = substr.substring(0, substr.indexOf('"'));
		var image = Snap.parse(contents);
	  sprite.append(image);
		var temp = sprite.select("#" + id);
		temp.click(switchSprite);
		spriteList.push(temp);

}
var cloneSVG = function(image, id)
{
	var temp = image.clone()
	temp.attr({
		'height': image.attr('height')/3,
		'width': image.attr('width')/3,
		x: spriteXoffset + 2,
		y: spriteYoffset,
		id: 'small' + id,
		blockxml: "<XML></XML>"
	});
	spriteXoffset = spriteXoffset + parseInt(temp.attr('width'));
	if(spriteXoffset == sprite.node.width.baseVal)
	{
		spriteYoffset += parseInt(temp.attr('height'));
	}
	temp.click(switchSprite);
	sprite.append(temp);
	spriteList.push(temp);
	updateStorage();

}
var addSprites = function()
{
	maxX = stage.node.width.baseVal.value; //TODO reset on resize
  maxY = stage.node.height.baseVal.value;
	//if(localStorage.getItem('StageSprites') !== null) {
	//store.get(StageSprites, function(sprites){console.log(sprites)})
  /*  this.get('StageSprites', function(sprites) {
			//var tempstageList = localStorage.getItem('StageSprites');
			//var tempspriteList = localStorage.getItem('SpriteAreaSprites');
			var temparr = sprites.split('>,');
			for(var i = 0; i < temparr.length; i++)
			{
				temparr[i] += '>';
				importSVG(temparr[i], false);
			}
			stageList = temparr;
    });
})

		temparr = tempspriteList.split('>,');
		for(var i = 0; i < temparr.length; i++)
		{
			temparr[i] += '>';
			addToSpriteArea(temparr[i]);
		}
		spriteList = temparr;*/
  //}
	//else {
		for(var i = 0; i < stageList.length; i++)
		{
			stage.append(stageList[i]);
			sprite.append(spriteList[i]);
		}
	//}
}

/*arrow.drag(move, start, stop);*/
