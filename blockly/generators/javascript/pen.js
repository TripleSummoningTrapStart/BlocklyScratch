 /**
 * Created by Dominik on 11/16/2015.
 */

'use strict';

goog.provide('Blockly.JavaScript.pen');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['pen_clear'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar stamp = " + S(clearPenLines).toString() + ";\n";
  }
  else {
     code = 'clearPenLines();\n';
  }
  return code;
};

Blockly.JavaScript['pen_stamp'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar stamp = " + S(stamp).toString() + ";\n";
  }
  else {
     code = 'stamp(sprite);\n';
  }
  return code;
};

Blockly.JavaScript['pen_pen_down'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar penDown = " + S(penDown).toString() + ";\n";
  }
  else {
    code = 'penDown(sprite);\n';
  }
  return code;
};

Blockly.JavaScript['pen_pen_up'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar penUp = " + S(penUp).toString() + ";\n";
  }
  else {
    code = 'penUp(sprite);\n';
  }
  return code;
};

Blockly.JavaScript['pen_change_pen_color_by'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar changeColor = " + S(changeColor).toString() + ";\n";
  }
  else {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
    code = 'changeColor(sprite, '+value_name+');\n';
  }
  return code;
};

Blockly.JavaScript['pen_set_pen_color_to'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar setColorByNumber = " + S(setColorByNumber).toString() + ";\n";
  }
  else {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
    code = 'setColorByNumber(sprite, '+value_name+');\n';
  }
  return code;
};

Blockly.JavaScript['pen_change_pen_shade_by'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar changeShade = " + S(changeShade).toString() + ";\n";
  }
  else {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
    code = 'changeShade(sprite, '+value_name+');\n';
  }
  return code;
};

Blockly.JavaScript['pen_set_pen_shade_to'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar setShade = " + S(setShade).toString() + ";\n";
  }
  else {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
    code = 'setShade(sprite, '+value_name+');\n';
  }
  return code;
};

Blockly.JavaScript['pen_change_pen_size_by'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar changeSize = " + S(changeSize).toString() + ";\n";
  }
  else {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
    code = 'changeSize(sprite, '+value_name+');\n';
  }
  return code;
};

Blockly.JavaScript['pen_set_pen_size_to'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar setSize = " + S(setSize).toString() + ";\n";
  }
  else {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
    code = 'setSize(sprite, '+value_name+');';
  }
  return code;
};
Blockly.JavaScript['pen_set_color'] = function(block) {
  var code = "";
  if(downloadingCode){
    code = "// FunctionHeaderForRemovingExcess\nvar setColorByColor = " + S(setColorByColor).toString() + ";\n";
  }
  else {
    var text_name = block.getFieldValue('NAME');
    var colour_name = block.getFieldValue('NAME');
    //colour_name = colour_name.replace('#', '');
    var arr = RGBtoHSV(colour_name);
    code = 'setColorByColor(sprite, '+arr+');\n';
  }
  return code;
};
