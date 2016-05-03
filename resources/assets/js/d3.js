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

  // Switches the workspace to the sprite given
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

  // Function that roates the given object without any animations
  var rotateWithoutAnimation = function(obj) {
  	var boundingBox = obj.node().getBBox();
  	var objX = parseInt(boundingBox.x) + parseInt(boundingBox.width/2);
  	var objY = parseInt(boundingBox.y) + parseInt(boundingBox.height/2);
    var rotationStyle = obj.attr('rotationStyle');
    var rotationDegree = parseInt(obj.attr('rotationDegree'));
    if(rotationStyle == 'NONE')
    {
        return;
    }
    obj.attr("transform", "rotate(" + rotationDegree +"," + objX + "," + objY +")");
  };

 var setInAnim = function(obj, inAnim){
   obj.attr("inAnim", inAnim)
 };

  // Function to draw a line following the given object
  var draw = function(obj, changeX, changeY){
      var boundingBox = obj.node().getBBox();
      var lineY = parseInt(boundingBox.y) + parseInt(boundingBox.height/2);
      var xAdj = parseInt(boundingBox.width/2);
      var lineX = parseInt(boundingBox.x) + parseInt(boundingBox.width/2);
      var yAdj = parseInt(boundingBox.height/2);
      var l = stage.append("line")
                    .attr("id", "draw")
                    .attr("x1", lineX)
                    .attr("y1", lineY)
                    .attr("x2", lineX + changeX)
                    .attr("y2", lineY + changeY)
                    .attr("stroke",  obj.attr('strokePen'))
                    .attr("stroke-width", obj.attr('strokeSize'));
        obj.moveToFront();
  };

  // Function that inserts an import SVG button in the given div tag
  // @param div tag id
  var createImportSVGButton = function(divID) {
   $('#' + divID)
   .append('<button id="btnImportSVG" class="btn btn-success">Upload SVG:</button>')
   .button()
   //.click(importSVG)
 };

 // Function that inserts and fills the SVG stage within the given div tag
 // @param div tag id
 var createSVGStage = function(divID){
   $('#' + divID)
   .append('<svg id="svgStage" style = "outline: 5px solid black"  class="row" viewBox ="0 0 480 360">' +
            '<pattern id="pattern" patternUnits="userSpaceOnUse" x="0" y="0" width ="10" height = "10" viewbox="0 0 10 10">' +
            '<path d="M-5,0,10,15m0-5,15,10" stroke="white" stroke-width="5"/>' +
            '</pattern></svg>');
  SVGAreas.stage = d3.select("#svgStage");
  SVGAreas.maxX = SVGAreas.stage.attr('viewBox').split(' ')[2]//parseInt(stage.style("width")); //TODO reset on resize
  SVGAreas.maxY = SVGAreas.stage.attr('viewBox').split(' ')[3]//parseInt(stage.style("height"));
  fillStage();
 }

 // Function that fills the stage with the default SVG objects
 var fillStage = function() {

   SVGAreas.mySquare  = SVGAreas.stage.append("rect")
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
     .attr('fill', 'purple')
     .attr('stroke', 'black')
     .attr('stroke-width', 5)
     .call(dragSquare);

   SVGAreas.myCircle = SVGAreas.stage.append("circle")
     .attr("cx", 100)
     .attr("cy", 70)
     .attr("r", 20)
     .attr("id", 'c2')
     .attr("rotationDegree", 0)
     .attr("penDown", 'false')
     .attr("rotationStyle", "all")
     .attr("colorDirection", 1)
     .attr("shadeDirection", 1)
     .attr("strokePen", d3.rgb("#00ADEF"))
     .attr("strokeSize", 2)
     .attr("inAnim", 'false')
     .attr("pointDir", 0)
     .attr('fill', 'purple')
     .attr('stroke', 'black')
     .attr('stroke-width', 5)
     .call(dragCircle);
 };

 // Function that fills the SVG sprite area with the default small sprites
 var fillSprite = function(){
    SVGAreas.miniSquare = SVGAreas.sprite.append("rect")
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
    SVGAreas.miniCircle = SVGAreas.sprite.append("circle")
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

 // Function that inserts the console and SVG sprite area into the given div tag
 // then fills the SVG sprite area with the default small sprites
 // @param div tag id
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
   SVGAreas.sprite = d3.select("#svgSprite");
   fillSprite();
 };

 // Function that creates and fills the SVG sprite area within the given div tag
 // @param div tag id
 var createSVGSprite = function(divID) {
   $('#' + divID)
   .append('<svg id="svgSprite" style = "outline: 1px solid black"  class="row" viewBox ="0 0 100 100">' +
         '<pattern id="pattern" patternUnits="userSpaceOnUse" x="0" y="0" width ="10" height = "10" viewbox="0 0 10 10">' +
           '<path d="M-5,0,10,15m0-5,15,10" stroke="white" stroke-width="2"/>' +
         '</pattern>' +
       '</svg>');
   SVGAreas.sprite = d3.select("#svgSprite");
   fillSprite();
 };

 // Function that creates the console within the given div tag area
 // @param div tag id
 var createConsole = function(divID) {
   $('#' + divID)
   .append('<textarea rows="21" cols="105" id="textArea" readonly></textArea>' +
            '<textarea rows="1" cols="105" id="consoleInput" style="display:none" onkeydown="if(event.keyCode==13){ submit(); return false;}">Enter text here...</textArea>');
 };
 var draw = function(obj, changeX, changeY){

     var boundingBox = obj.node().getBBox();
     var lineY = parseInt(boundingBox.y) + parseInt(boundingBox.height/2);
     var xAdj = parseInt(boundingBox.width/2);
     var lineX = parseInt(boundingBox.x) + parseInt(boundingBox.width/2);
     var yAdj = parseInt(boundingBox.height/2);
     var l = stage.append("line")
                   .attr("id", "draw")
                   .attr("x1", lineX)
                   .attr("y1", lineY)
                   .attr("x2", lineX + changeX)
                   .attr("y2", lineY + changeY)
                   .attr("stroke",  obj.attr('strokePen'))
                   .attr("stroke-width", obj.attr('strokeSize'));
       obj.moveToFront();
 }

  // Public variables and functions
  return {
      switchSprite : switchSprite,
      stage : stage,
      sprite : sprite,
      maxX : maxX,
      maxY : maxY,
      mySquare : mySquare,
      myCircle : myCircle,
      createImportSVGButton : createImportSVGButton,
      setInAnim: setInAnim,
      createSVGStage : createSVGStage,
      createTabSVGConsole : createTabSVGConsole,
      rotateWithoutAnimation: rotateWithoutAnimation,
      createSVGSprite : createSVGSprite,
      createConsole : createConsole,
      draw : draw

  }

}) (); // End of module
