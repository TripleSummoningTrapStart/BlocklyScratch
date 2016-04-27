var SVGAreas = (function() {
  var stage;// = d3.select("#svgStage");
  var sprite;// = d3.select("#svgSprite");
  var focused;
  var	maxX;// = stage.attr('viewBox').split(' ')[2]//parseInt(stage.style("width")); //TODO reset on resize
  var maxY;// = stage.attr('viewBox').split(' ')[3]//parseInt(stage.style("height"));
  var dragSquare = d3.behavior.drag()
              .on("dragstart", moveStart)
              .on("drag", moveSquare)
              .on("dragend", moveStop);
  var dragCircle = d3.behavior.drag()
              .on("dragstart", moveStart)
              .on("drag", moveCircle)
              .on("dragend", moveStop);
  var mySquare;
  var myCircle;
  var miniSquare;
  var miniCircle;
  focused = miniSquare;

  //Code objtained from http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

  var switchSprite = function(sprite)
  {
  	focused.attr({blockxml: Blockly.Xml.domToText( Blockly.Xml.workspaceToDom(workspace))})
  	focused = sprite;
  	workspace.clear();
  	Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(focused.attr('blockxml')));
  };

  function moveStart (d){
    var obj = d3.select(this);
    obj.attr("penDown", "false")
    obj.moveToFront();
  }

  // Function that moves a sprite with x and y vaules sprite while dragging, due to issues with rotate transforms, it resets all transforms on the object before moving
  function moveSquare(d) {
   var obj = d3.select(this);
   obj.attr('transform', '');
   obj.attr({'x': d3.event.x, 'y': d3.event.y});
 }

  // Function that resets the sprite rotations after drag.
  function moveStop (d) {
    var obj = d3.select(this);
    rotateWithoutAnimation(obj);
    obj.moveToFront();
    obj.attr("pendDown", "true")
  };

  // Function that moves a sprite with cx and cy vaules sprite while dragging, due to issues with rotate transforms, it resets all transforms on the object before moving
  function moveCircle(d){
    var obj = d3.select(this);
    obj.attr('transform', '');
    obj.attr({'cx': d3.event.x, 'cy': d3.event.y});
  }

  var createImportSVGButton = function(divID) {
   $('#' + divID)
   .append('<button id="btnImportSVG" class="btn btn-success">Upload SVG:</button>')
   .button()
   //.click(importSVG)
 };

 var createSVGStage = function(divID){
   $('#' + divID)
   .append('<svg id="svgStage" style = "outline: 5px solid black"  class="row" viewBox ="0 0 480 360">' +
            '<pattern id="pattern" patternUnits="userSpaceOnUse" x="0" y="0" width ="10" height = "10" viewbox="0 0 10 10">' +
            '<path d="M-5,0,10,15m0-5,15,10" stroke="white" stroke-width="5"/>' +
            '</pattern></svg>');
  stage = d3.select("#svgStage");
  maxX = stage.attr('viewBox').split(' ')[2]//parseInt(stage.style("width")); //TODO reset on resize
  maxY = stage.attr('viewBox').split(' ')[3]//parseInt(stage.style("height"));
  fillStage();
 }

 var fillStage = function() {
   mySquare  = stage.append("rect")
     .attr("x", 240)
     .attr("y", 140)
     .attr("width",30)
     .attr("height",30)
   	.attr("id", 's2')
   	.attr("rotationDegree", 0)
   	.attr("penDown", 'false')
   	.attr("rotationStyle", "all")
   	//next 3 variables are for pen color
   	.attr("colorDirection", 1)
   	.attr("shadeDirection", 1)
   	.attr("strokePen", d3.rgb("#00ADEF"))
   	.attr("strokeSize", 2)
     .attr("inAnim", 'false')
     .attr("pointDir", 0)
     .attr("pointDir", 0)
     .attr('fill', 'purple')
     .attr('stroke', 'black')
     .attr('stroke-width', 5)
     .call(dragSquare);
   myCircle = stage.append("circle")
     .attr("cx", 100)
     .attr("cy", 70)
     .attr("r", 20)
     .attr("id", 'c2')
     .attr("rotationDegree", 0)
     .attr("penDown", 'false')
     .attr("rotationStyle", "all")
     .attr("pointDir", 0)
     .attr('fill', 'purple')
     .attr('stroke', 'black')
     .attr('stroke-width', 5)
     .call(dragCircle);
 };

 var fillSprite = function(){
    miniSquare = sprite.append("rect")
     .attr("x", -25)
     .attr("y", 5)
     .attr("width",10)
     .attr("height",10)
     .attr("id", 'ms2')
     .attr("blockXML", "<XML></XML>")
     .attr('fill', 'purple')
     .attr('stroke', 'black')
     .attr('stroke-width', 1)
     .on("click", function(){ switchSprite(miniSquare); });
    miniCircle = sprite.append("circle")
     .attr("cx", 0)
     .attr("cy",10)
     .attr("r",5)
     .attr("id", 'mc2')
     .attr("blockXML", "<XML></XML>")
     .attr('fill', 'purple')
     .attr('stroke', 'black')
     .attr('stroke-width', 1)
     .on("click", function(){ switchSprite(miniCircle); });
 };

 var createTabSVGConsole = function(divID) {
   $('#' + divID)
   .append('<ul class="nav nav-tabs" role="tablist">' +
       '<li role="presentation" class="active"><a href="#console" aria-controls="console" role="tab" data-toggle="tab">Console</a></li>' +
       '<li role="presentation"><a href="#sprites" aria-controls="sprites" role="tab" data-toggle="tab">Sprites</a></li>' +
       '</ul>' +
     '<div class="tab-content">' +
       '<div role="tabpanel" class="tab-pane active" id="console">' +
         '<textarea rows="21" cols="105" id="textArea" readonly></textArea>' +
         '<textarea rows="1" cols="105" id="consoleInput" style="display:none" onkeydown="if(event.keyCode==13){ submit(); return false;}">Enter text here...</textArea>' +
       '</div>' +
       '<div role="tabpanel" class="tab-pane" id="sprites">' +
           '<svg id="svgSprite" style = "outline: 1px solid black"  class="row" viewBox ="0 0 100 100">' +
               '<pattern id="pattern" patternUnits="userSpaceOnUse" x="0" y="0" width ="10" height = "10" viewbox="0 0 10 10">' +
                 '<path d="M-5,0,10,15m0-5,15,10" stroke="white" stroke-width="2"/>' +
               '</pattern>' +
               '</svg>' +
             '</div>' +
     '</div>');
   sprite = d3.select("#svgSprite");
   fillSprite();
 };

 var createSVGSmall = function(divID) {

 };

 var createConsole = function(divID) {

 };

  return {
      switchSprite : switchSprite,
      stage : stage,
      sprite : sprite,
      maxX : maxX,
      maxY : maxY,
      mySquare : mySquare,
      myCircle : myCircle,
      createImportSVGButton : createImportSVGButton,
      createSVGStage : createSVGStage,
      createTabSVGConsole : createTabSVGConsole
  }

}) ();
