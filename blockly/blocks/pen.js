/**
 * pen blocks
 * Created by David Barnes III on 2/18/2016.
 */

'use strict';

goog.provide('Blockly.Blocks.pen');

goog.require('Blockly.Blocks');

Blockly.Blocks.pen.HSV_HUE = 160;
Blockly.Blocks.pen.HSV_SATURATION = 0.95;
Blockly.Blocks.pen.HSV_VALUE = 0.62;


Blockly.Blocks['pen_clear'] = {
  init: function() {
    //this.appendValueInput()
    this.appendDummyInput()  
		.appendField("clear");
	 //this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_stamp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stamp");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_pen_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("pen down");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_pen_up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("pen up");
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_change_pen_color_by'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change pen color by");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_set_pen_color_to'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set pen color to");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_change_pen_shade_by'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change pen shade by");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_set_pen_shade_to'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set pen shade to");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_change_pen_size_by'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change pen size by");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pen_set_pen_size_to'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set pen size to");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.pen.HSV_HUE, Blockly.Blocks.pen.HSV_SATURATION, Blockly.Blocks.pen.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};