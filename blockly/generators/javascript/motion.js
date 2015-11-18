/**
 * Created by Dominik on 11/16/2015.
 */

'use strict';

goog.provide('Blockly.JavaScript.motion');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['motion_step'] = function(block) {
    var text_num_steps = block.getFieldValue('NUM_STEPS');
    // TODO: Assemble JavaScript into code variable.
    var code = 'moveStep(sprite, value_num_steps);';
    return code;
};

Blockly.JavaScript['motion_turn_clockwise'] = function(block) {
    var angle_turn_angle = block.getFieldValue('TURN_ANGLE');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_turn_counterclockwise'] = function(block) {
    var angle_turn_angle = block.getFieldValue('TURN_ANGLE');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_pointin'] = function(block) {
    var dropdown_directions = block.getFieldValue('DIRECTIONS');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_pointtowards'] = function(block) {
    var dropdown_objects = block.getFieldValue('OBJECTS');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_glideto'] = function(block) {
    var text_time = block.getFieldValue('TIME');
    var text_x_val = block.getFieldValue('X_VAL');
    var text_y_val = block.getFieldValue('Y_VAL');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_changex'] = function(block) {
    var text_change_num = block.getFieldValue('CHANGE_NUM');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_changey'] = function(block) {
    var text_change_num = block.getFieldValue('CHANGE_NUM');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_setx'] = function(block) {
    var text_new_val = block.getFieldValue('NEW_VAL');
    // TODO: Assemble JavaScript into code variable.
    var code = 'bigCircle.attr("cx", ' + text_new_val + ');';
    return code;
};

Blockly.JavaScript['motion_sety'] = function(block) {
    var text_new_val = block.getFieldValue('NEW_VAL');
    // TODO: Assemble JavaScript into code variable.
    var code = 'bigCircle.attr("cy", ' + text_new_val + ');';
    return code;
};

Blockly.JavaScript['motion_gotoxy'] = function(block) {
    var text_new_x_val = block.getFieldValue('NEW_X_VAL');
    var text_new_y_val = block.getFieldValue('NEW_Y_VAL');
    // TODO: Assemble JavaScript into code variable.
    var code = 'bigCircle.attr("cx", ' + text_new_x_val + ');\nbigCircle.attr("cy", ' + text_new_y_val + ');';
    return code;
};

Blockly.JavaScript['motion_goto'] = function(block) {
    var dropdown_objects = block.getFieldValue('OBJECTS');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    return code;
};

Blockly.JavaScript['motion_bounceonedge'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
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