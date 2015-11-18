/**
 * Motion blocks
 * Created by Dominik Haeflinger on 11/16/2015.
 */

'use strict';

goog.provide('Blockly.Blocks.motion');

goog.require('Blockly.Blocks');

Blockly.Blocks.motion.HUE = 222;

Blockly.Blocks['motion_step'] = {
    /**
     * Block for moving sprite given number of steps
     * @this Blockly.Block
     */
    init: function () {
        this.appendDummyInput()
            .appendField("move")
            .appendField(new Blockly.FieldTextInput("10"), "NUM_STEPS")
            .appendField("steps");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
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
            .appendField("turn clockwise")
            .appendField(new Blockly.FieldAngle("15"), "TURN_ANGLE")
            .appendField("degrees");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
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
            .appendField("turn counter-clockwise")
            .appendField(new Blockly.FieldAngle("15"), "TURN_ANGLE")
            .appendField("degrees");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_pointin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("point in direction")
            .appendField(new Blockly.FieldDropdown([["90 (right)", "RIGH"], ["-90 (left)", "LEFT"], ["0 (up)", "UP"], ["180 (down)", "DOWN"]]), "DIRECTIONS");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
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
        this.setColour(Blockly.Blocks.motion.HUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_gotoxy'] = {
    /**
     * Block for setting the x and y values of sprite
     * @this Blockly.Block
     */
    init: function() {
        this.appendDummyInput()
            .appendField("goto x:")
            .appendField(new Blockly.FieldTextInput("0"), "NEW_X_VAL")
            .appendField("y:")
            .appendField(new Blockly.FieldTextInput("0"), "NEW_Y_VAL");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(225);
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
        this.setColour(Blockly.Blocks.motion.HUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['motion_glideto'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("glide")
            .appendField(new Blockly.FieldTextInput("1"), "TIME")
            .appendField("seconds to x:")
            .appendField(new Blockly.FieldTextInput("0"), "X_VAL")
            .appendField("y:")
            .appendField(new Blockly.FieldTextInput("0"), "Y_VAL");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
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
        this.appendDummyInput()
            .appendField("change x by")
            .appendField(new Blockly.FieldTextInput("10"), "CHANGE_NUM");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
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
        this.appendDummyInput()
            .appendField("change y by")
            .appendField(new Blockly.FieldTextInput("10"), "CHANGE_NUM");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
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
        this.appendDummyInput()
            .appendField("set x to")
            .appendField(new Blockly.FieldTextInput("0"), "NEW_VAL");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
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
        this.appendDummyInput()
            .appendField("set y to")
            .appendField(new Blockly.FieldTextInput("0"), "NEW_VAL");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.motion.HUE);
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
        this.setColour(Blockly.Blocks.motion.HUE);
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
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};