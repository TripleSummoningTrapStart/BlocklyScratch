/**
* Event blocks
* Created by David Barnes III on...
*/

'use strict';

goog.provide('Blockly.Blocks.events');

goog.require('Blockly.Blocks');

Blockly.Blocks.events.HSV_HUE = 33;
Blockly.Blocks.events.HSV_SATURATION = 0.75;
Blockly.Blocks.events.HSV_VALUE = 0.78;

Blockly.Blocks['events_hat_when_run_clicked'] = {
  /**
   * Block for determining the beginning of code to be run
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("when 'Run' clicked");
	Blockly.BlockSvg.START_HAT = true;
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.events.HSV_HUE, Blockly.Blocks.events.HSV_SATURATION, Blockly.Blocks.events.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');

  }
};

Blockly.Blocks['events_hat_when_key_press'] = {
  /**
  * Block for determing what to do when a certian key is pressed.
  * @this Blockly.Block
  */
  init: function() {
    this.appendDummyInput()
        .appendField("when");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["space", "space"], ["up arrow", "up"], ["down arrow", "down"], ["left arrow", "left"], ["right arrow", "right"], ["any", "any"], ["a", "a"], ["b", "b"], ["c", "c"], ["d", "d"], ["e", "e"], ["f", "f"], ["g", "g"], ["h", "h"], ["i", "i"], ["j", "j"], ["k", "k"], ["l", "l"], ["m", "m"], ["n", "n"], ["o", "o"], ["p", "p"], ["q", "q"], ["r", "r"], ["s", "s"], ["t", "t"], ["u", "u"], ["v", "v"], ["w", "w"], ["x", "x"], ["y", "y"], ["z", "z"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]), "KEY");
    this.appendDummyInput()
        .appendField("key pressed");
	Blockly.BlockSvg.START_HAT = true;
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.events.HSV_HUE, Blockly.Blocks.events.HSV_SATURATION, Blockly.Blocks.events.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['events_hat_when_sprite_clicked'] = {
  /**
  * Block for determining actions when a sprite is clicked
  * @this Blockly.Block
  */
  init: function() {
    this.appendDummyInput()
        .appendField("when this sprite clicked");
	Blockly.BlockSvg.START_HAT = true;
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.events.HSV_HUE, Blockly.Blocks.events.HSV_SATURATION, Blockly.Blocks.events.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['events_hat_when_backdrop_switched'] = {
  /**
  * Block for determing what to do when background is switched
  * @this Blockly.Block
  */
  init: function() {
    this.appendDummyInput()
        .appendField("when backdrop switches to");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["backdrop1", "default"]]), "backdrops");
    Blockly.BlockSvg.START_HAT = true;
	this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.events.HSV_HUE, Blockly.Blocks.events.HSV_SATURATION, Blockly.Blocks.events.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['events_hat_when_compare'] = {
  /**
  * Block for determing
  * @this Blockly.Block
  */
  init: function() {
    this.appendDummyInput()
        .appendField("when");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["loudness", "volume"], ["time", "time"], ["video motion", "video"]]), "variable");
    this.appendDummyInput()
        .appendField(">");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("10"), "value");
	Blockly.BlockSvg.START_HAT = true;
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.events.HSV_HUE, Blockly.Blocks.events.HSV_SATURATION, Blockly.Blocks.events.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['events_hat_when_receive'] = {
  /**
  * Block for determing what to do when a certian message is recived
  * @this Blockly.Block
  */
  init: function() {
    this.appendDummyInput()
        .appendField("when I receive");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["message1", "default"], ["new message", "new"]]), "message");
    Blockly.BlockSvg.START_HAT = true;
	this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.events.HSV_HUE, Blockly.Blocks.events.HSV_SATURATION, Blockly.Blocks.events.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['events_broadcast'] = {
  /**
  * Block for broadcasting a message to another sprite
  * @this Blockly.Block
  */
  init: function() {
    this.appendDummyInput()
        .appendField("broadcast ")
        .appendField(new Blockly.FieldDropdown([["message1", "default"], ["add message...", "add"]]), "messages");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setColour(Blockly.Blocks.events.HSV_HUE, Blockly.Blocks.events.HSV_SATURATION, Blockly.Blocks.events.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['events_broadcast_wait'] = {
  /**
  * Block for wating for a broadcast message from antoher sprite
  * @this Blockly.Block
  */
  init: function() {
    this.appendDummyInput()
        .appendField("broadcast ")
        .appendField(new Blockly.FieldDropdown([["message1", "default"], ["add message...", "add"]]), "messages")
        .appendField("and wait");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setColour(Blockly.Blocks.events.HSV_HUE, Blockly.Blocks.events.HSV_SATURATION, Blockly.Blocks.events.HSV_VALUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
