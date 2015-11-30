/**
 * Motion blocks
 * Created by Dominik Haeflinger on 11/16/2015.
 */

'use strict';

goog.provide('Blockly.Blocks.motion');

goog.require('Blockly.Blocks');

Blockly.Blocks.motion.HSV_HUE = 222;
Blockly.Blocks.motion.HSV_SATURATION = 0.67;
Blockly.Blocks.motion.HSV_VALUE = 0.75;

Blockly.Blocks['motion_step'] = {
    /**
     * Block for moving sprite given number of steps
     * @this Blockly.Block
     */
    init: function() {
        this.appendValueInput("NUM_STEPS")
            .setCheck("Number")
            .appendField("move");
        this.appendDummyInput()
            .appendField("steps");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_turn_clockwise'] = {
    /**
     * Block for turning sprite clockwise the given number of degrees
     * @this Blockly.Block
     */
    init: function() {
        this.appendDummyInput()
            .appendField("turn")
			.appendField(new Blockly.FieldImage("blockly\\media\\clockwiseturn.png", 20, 20, "clockwise"))
            .appendField(new Blockly.FieldAngle("15"), "TURN_ANGLE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_turn_counterclockwise'] = {
    /**
     * Block for turning sprite counter-clockwise the given number of degrees
     * @this Blockly.Block
     */
    init: function () {
        this.appendDummyInput()
            .appendField("turn")
            .appendField(new Blockly.FieldImage("blockly\\media\\counterclockwiseturn.png", 20, 20, "counter-clockwise"))
            .appendField(new Blockly.FieldAngle("15"), "TURN_ANGLE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_pointin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("point in direction")
            .appendField(new Blockly.FieldDropdown([["90 (right)", "RIGHT"], ["-90 (left)", "LEFT"], ["0 (up)", "UP"], ["180 (down)", "DOWN"]]), "DIRECTIONS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_pointtowards'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("point towards")
            .appendField(new Blockly.FieldDropdown([["mouse-pointer", "MOUSE"]]), "OBJECTS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_gotoXY'] = {
    /**
     * Block for setting the x and y values of sprite
     * @this Blockly.Block
     */
    init: function() {
        this.appendValueInput("NEW_X_VAL")
            .setCheck("Number")
            .appendField("go to x:");
        this.appendValueInput("NEW_Y_VAL")
            .setCheck("Number")
            .appendField("y:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_goto'] = {
    /**
     * Block for setting the x and y values of sprite to other objects
     * @this Blockly.Block
     */
    init: function() {
        this.appendDummyInput()
            .appendField("goto")
            .appendField(new Blockly.FieldDropdown([["mouse-pointer", "MOUSE"]]), "OBJECTS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_glideto'] = {
    /**
     * Block for gliding the sprite to x and y values over given number of seconds
     */
    init: function() {
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField("glide");
        this.appendValueInput("X_VAL")
            .setCheck("Number")
            .appendField("seconds to x:");
        this.appendValueInput("Y_VAL")
            .setCheck("Number")
            .appendField("y:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_changex'] = {
    /**
     * Block for changing the x value of sprite
     * @this Blockly.Block
     */
    init: function() {
        this.appendValueInput("CHANGE_NUM")
            .setCheck("Number")
            .appendField("change x by");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_changey'] = {
    /**
     * Block for changing the y value of sprite
     * @this Blockly.Block
     */
    init: function() {
        this.appendValueInput("CHANGE_NUM")
            .setCheck("Number")
            .appendField("change y by");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_setx'] = {
    /**
     * Block for setting the x value of sprite
     * @this Blockly.Block
     */
    init: function() {
        this.appendValueInput("NEW_VAL")
            .setCheck("Number")
            .appendField("set x to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_sety'] = {
    /**
     * Block for setting the y value of sprite
     * @this Blockly.Block
     */
    init: function() {
        this.appendValueInput("NEW_VAL")
            .setCheck("Number")
            .appendField("set y to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_bounceonedge'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("if on edge, bounce");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_rotation_style'] = {
    /**
     * I'm not sure what this block is suppose to to do
     */
    init: function() {
        this.appendDummyInput()
            .appendField("set rotation style")
            .appendField(new Blockly.FieldDropdown([["left-right", "LtoR"], ["don't rotate", "NONE"], ["all around", "all"]]), "OPTIONS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HSV_HUE, Blockly.Blocks.motion.HSV_SATURATION, Blockly.Blocks.motion.HSV_VALUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};