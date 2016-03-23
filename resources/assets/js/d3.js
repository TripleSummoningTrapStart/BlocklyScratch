var stage = d3.select("#svgStage");
var sprite = d3.select("#svgSprite")
var focused;
var spriteList = [];//TODO put into cache
var stageList = [];//TODO put into cache

var switchSprite = function(sprite)
{
	focused.attr({blockXML: Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(workspace))})
	focused = sprite;
	workspace.clear();
	Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(focused.attr('blockXML')));

}
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

var miniSquare = sprite.append("rect")
  .attr("x", -75)
  .attr("y", 5)
  .attr("width",10)
  .attr("height",10)
  .attr("id", 'mc2')
  .attr("blockXML", "<XML></XML>")
  .on("click", function() {switchSprite(miniSquare)});

var myCircle= stage.append("circle")
    .attr("cx",100)
    .attr("cy",70)
    .attr("r",20)
  	.attr("id", 's2')
  	.attr("rotationDegree", 0)
  	.attr("penDown", "false")
  	.attr("rotationStyle", "all")
    .attr("pointDir", 0);

var miniCircle = sprite.append("circle")
    .attr("cx", -50)
    .attr("cy", 5)
    .attr("r",10)
    .attr("id", 'ms2')
    .attr("blockXML", "<XML></XML>")
    .on("click", function() {switchSprite(miniCircle)});
focused = miniSquare;
stageList.push(myCircle);
spriteList.push(miniCircle);
stageList.push(mySquare);
spriteList.push(miniSquare);
var	maxX = stage.node.width.baseVal.value; //TODO reset on resize
var  maxY = stage.node.height.baseVal.value;

//use obj.node().nodeName to get type, use obj.node().Attributes[i].name and obj.node().attributes[i].value
