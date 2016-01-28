/**
 * Created by Dominik on 11/16/2015.
 */

'use strict';

goog.provide('Blockly.JavaScript.motion');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['motion_step'] = function(block) {
    var value_num_steps = Blockly.JavaScript.valueToCode(block, 'NUM_STEPS', Blockly.JavaScript.ORDER_ATOMIC);
   
    var code = 'moveStep(sprite, ' + value_num_steps + ');\n';
    return code;
};

Blockly.JavaScript['motion_turn_clockwise'] = function(block) {
    var turn_angle = block.getFieldValue('TURN_ANGLE');
    var code = "rotateClock(sprite," + turn_angle + ");\n";
    return code;
};

Blockly.JavaScript['motion_turn_counterclockwise'] = function(block) {
    var turn_angle = block.getFieldValue('TURN_ANGLE') * -1;
    var code = "rotateClock(sprite," + turn_angle + ");\n";
    return code;
};

Blockly.JavaScript['motion_pointin'] = function(block) {
    var dropdown_directions = block.getFieldValue('DIRECTIONS');
    var code = "pointIn(sprite, " + dropdown_directions + ");\n";
    return code;
};

Blockly.JavaScript['motion_pointtowards'] = function(block) {
    var dropdown_objects = block.getFieldValue('OBJECTS');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_gotoXY'] = function(block) {
    var value_new_x_val = Blockly.JavaScript.valueToCode(block, 'NEW_X_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var value_new_y_val = Blockly.JavaScript.valueToCode(block, 'NEW_Y_VAL', Blockly.JavaScript.ORDER_ATOMIC);
   
    var code = 'gotoXY(sprite, ' + value_new_x_val + ', ' + value_new_y_val + ');\n';
    return code;
};

Blockly.JavaScript['motion_goto'] = function(block) {
    var dropdown_objects = block.getFieldValue('OBJECTS');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_glideto'] = function(block) {
    var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x_val = Blockly.JavaScript.valueToCode(block, 'X_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y_val = Blockly.JavaScript.valueToCode(block, 'Y_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'glideTo(sprite, '+ value_time + ',' + value_x_val + ',' + (value_y_val *-1) +')\n;';
    return code;
};

Blockly.JavaScript['motion_changex'] = function(block) {
    var value_change_num = Blockly.JavaScript.valueToCode(block, 'CHANGE_NUM', Blockly.JavaScript.ORDER_ATOMIC);
 
    var code = 'changeX(sprite, ' + value_change_num + ');\n';
    return code;
};

Blockly.JavaScript['motion_changey'] = function(block) {
    var value_change_num = Blockly.JavaScript.valueToCode(block, 'CHANGE_NUM', Blockly.JavaScript.ORDER_ATOMIC);
   
    var code = 'changeY(sprite, ' + value_change_num + ');\n';
    return code;
};

Blockly.JavaScript['motion_setx'] = function(block) {
    var value_new_val = Blockly.JavaScript.valueToCode(block, 'NEW_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    
    var code = 'setX(sprite, ' + value_new_val + ');\n';
    return code;
};

Blockly.JavaScript['motion_sety'] = function(block) {
    var value_new_val = Blockly.JavaScript.valueToCode(block, 'NEW_VAL', Blockly.JavaScript.ORDER_ATOMIC);
   
    var code = 'setY(sprite, ' + value_new_val + ');\n';
    return code;
};

Blockly.JavaScript['motion_bounceonedge'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'onEdgeBounce = True;\n';
    return code;
};

Blockly.JavaScript['motion_rotation_style'] = function(block) {
    var dropdown_options = block.getFieldValue('OPTIONS');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

/**
console.log('moveCircle');
bigCircle.transform('t10 0');
bigCircle.attr('cy', 50);
var t = new Snap.Matrix();
 t.translate(50, -50);
 bigCircle.transform(t);
 */