var stage = d3.select("#svgStage");
var sprite = d3.select("#svgSprite");
var focused;
var dragSquare = d3.behavior.drag()
            .on("drag", moveSquare)
            .on("dragend", stop);
var dragCircle = d3.behavior.drag()
            .on("drag", moveCircle);
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
  .attr('stroke-width', 5)
  .attr('transform', 'translate(1,1)')
  .call(dragSquare);
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
  .attr('stroke-width', 5)
  .call(dragCircle);
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

var	maxX = stage.style.width; //TODO reset on resize
var maxY = stage.style.height;


var switchSprite = function(sprite)
{
	focused.attr({blockxml: Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(workspace))})
	focused = sprite;
	workspace.clear();
	Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(focused.attr('blockxml')));
}

// Function that moves a sprite with x and y vaules sprite while dragging, due to issues with rotate transforms, it resets all transforms on the object before moving
function moveSquare(d) {
 var obj = d3.select(this);
 obj.attr('transform', '');
 obj.attr({'x': d3.event.x, 'y': d3.event.y});
}

// Function that resets the sprite rotations after drag.
function stop (d) {
  var obj = d3.select(this);
  rotateWithoutAnimation(obj);
}

// Function that moves a sprite with cx and cy vaules sprite while dragging, due to issues with rotate transforms, it resets all transforms on the object before moving
function moveCircle(d){
  var obj = d3.select(this);
  obj.attr('transform', '');
  obj.attr({'cx': d3.event.x, 'cy': d3.event.y});
}

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
		for(var i = 0; i < stageList.length; i++)
		{
			stage.append(stageList[i]);
			sprite.append(spriteList[i]);
		}
}
