 /**
 * Created by Dominik on 11/16/2015.
 */

'use strict';

goog.provide('Blockly.JavaScript.pen');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['pen_clear'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'CLEAR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'var red = 1;\n';
  return code;
};

Blockly.JavaScript['pen_stamp'] = function(block) {
  var code = 'stamp(sprite);\n';
  return code;
};

Blockly.JavaScript['pen_pen_down'] = function(block) {
  var code = 'penDown(sprite);\n';
  return code;
};

Blockly.JavaScript['pen_pen_up'] = function(block) {
  var code = 'penUp(sprite);\n';
  return code;
};

Blockly.JavaScript['pen_change_pen_color_by'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
  var code = 'changeColor(sprite, '+value_name+');\n';
  return code;
};

Blockly.JavaScript['pen_set_pen_color_to'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
  var code = 'setColor(sprite, '+value_name+');\n';
  return code;
};

Blockly.JavaScript['pen_change_pen_shade_by'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
  var code = 'changeShade(sprite, '+value_name+');\n';
  return code;
};

Blockly.JavaScript['pen_set_pen_shade_to'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
  var code = 'setShade(sprite, '+value_name+');\n';
  return code;
};

Blockly.JavaScript['pen_change_pen_size_by'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
  var code = 'changeSize(sprite, '+value_name+');\n';
  return code;
};

Blockly.JavaScript['pen_set_pen_size_to'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', order) || '0';
  var code = 'setSize(sprite, '+value_name+');';
  return code;
};
Blockly.JavaScript['pen_set_color'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var colour_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
