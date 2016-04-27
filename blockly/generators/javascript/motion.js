/**
 * Created by Dominik on 11/16/2015.
 */

'use strict';

goog.provide('Blockly.JavaScript.motion');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['motion_step'] = function(block) {
    var value_num_steps = Blockly.JavaScript.valueToCode(block, 'NUM_STEPS', Blockly.JavaScript.ORDER_ATOMIC);
    var code;
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar moveStep = " + S(moveStep).toString() + ";\n";
    }
    else{
      code = 'moveStep(sprite, ' + value_num_steps + ');\n';
    }
    return code;
};

Blockly.JavaScript['motion_turn_clockwise'] = function(block) {
    var turn_angle = block.getFieldValue('TURN_ANGLE');
    //var code = "rotate(sprite," + turn_angle + ");\n";
    //var code = "var id = sprite;\nvar rotateVal = " + turn_angle + ";\n";
    var code = "";
    if(workspace.downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar rotate = " + S(rotate).toString() + ";\n";
    }
    else{
      code = "rotate(sprite," + turn_angle + ");\n";
    }
    return code;
};

Blockly.JavaScript['motion_turn_counterclockwise'] = function(block) {
    var turn_angle = block.getFieldValue('TURN_ANGLE') * -1;
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar rotate = " + S(rotate).toString() + ";\n";
    }
    else{
      code = "rotate(sprite," + turn_angle + ");\n";
    }
    return code;
};

Blockly.JavaScript['motion_pointin'] = function(block) {
    var turn_angle = block.getFieldValue('TURN_ANGLE');
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar pointIn = " + S(pointIn).toString() + ";\n";
    }
    else{
      code = "pointIn(sprite, " + turn_angle + ");\n";
    }
    return code;
};

Blockly.JavaScript['motion_pointtowards'] = function(block) {
    var dropdown_objects = block.getFieldValue('OBJECTS');
    var code = "";
    if(downloadingCode){
      if (dropdown_objects == "MOUSE"){
        code = "// FunctionHeaderForRemovingExcess\nvar pointTowardsMouse = " + S(pointTowardsMouse).toString() + ";\n";
      }
      else {
        code = '...';
      }
    }
    else{
      if (dropdown_objects == "MOUSE"){
        code = "pointTowardsMouse(sprite);\n";
      }
      else {
        code = '...';
      }
    }
    return code;
};

Blockly.JavaScript['motion_gotoXY'] = function(block) {
    var value_new_x_val = Blockly.JavaScript.valueToCode(block, 'NEW_X_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var value_new_y_val = Blockly.JavaScript.valueToCode(block, 'NEW_Y_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar gotoXY = " + S(gotoXY).toString() + ";\n";
    }
    else{
      code = 'gotoXY(sprite, ' + value_new_x_val + ', ' + value_new_y_val + ');\n';
    }
    return code;
};

Blockly.JavaScript['motion_goto'] = function(block) {
    var dropdown_objects = block.getFieldValue('OBJECTS');
    var code = "";
    if(downloadingCode){
      if (dropdown_objects == "MOUSE"){
        code = "// FunctionHeaderForRemovingExcess\nvar gotoMouse = " + S(gotoMouse).toString() + ";\n";
      }
      else {
        code = '...';
      }
    }
    else{
      if (dropdown_objects == "MOUSE"){
        code = "gotoMouse(sprite);\n";
      }
      else {
        code = '...';
      }
    }
    return code;
};

Blockly.JavaScript['motion_glideto'] = function(block) {
    var value_time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x_val = Blockly.JavaScript.valueToCode(block, 'X_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y_val = Blockly.JavaScript.valueToCode(block, 'Y_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar glideTo = " + S(glideTo).toString() + ";\n";
    }
    else{
      code = 'glideTo(sprite, '+ value_time + ',' + value_x_val + ',' + value_y_val +')\n;';
    }
    return code;
};

Blockly.JavaScript['motion_changex'] = function(block) {
    var value_change_num = Blockly.JavaScript.valueToCode(block, 'CHANGE_NUM', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar changeX = " + S(changeX).toString() + ";\n";
    }
    else{
      code = 'changeX(sprite, ' + value_change_num + ');\n';
    }
    return code;
};

Blockly.JavaScript['motion_changey'] = function(block) {
    var value_change_num = Blockly.JavaScript.valueToCode(block, 'CHANGE_NUM', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar changeY = " + S(changeY).toString() + ";\n";
    }
    else{
      code = 'changeY(sprite, ' + value_change_num + ');\n';
    }
    return code;
};

Blockly.JavaScript['motion_setx'] = function(block) {
    var value_new_val = Blockly.JavaScript.valueToCode(block, 'NEW_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar setX = " + S(setX).toString() + ";\n";
    }
    else{
      code = 'setX(sprite, ' + value_new_val + ');\n';
    }
    return code;
};

Blockly.JavaScript['motion_sety'] = function(block) {
    var value_new_val = Blockly.JavaScript.valueToCode(block, 'NEW_VAL', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar setY = " + S(setY).toString() + ";\n";
    }
    else{
      code = 'setY(sprite, ' + value_new_val + ');\n';
    }
    return code;
};

Blockly.JavaScript['motion_bounceonedge'] = function(block) {
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar edgeBounce = " + S(edgeBounce).toString() + ";\n";
    }
    else{
       code = 'edgeBounce(sprite);\n';
    }
    return code;
};

Blockly.JavaScript['motion_rotation_style'] = function(block) {
    var dropdown_options = block.getFieldValue('OPTIONS');
    var code = "";
    if(downloadingCode){
      code = "// FunctionHeaderForRemovingExcess\nvar setRotationStyle = " + S(setRotationStyle).toString() + ";\n";
    }
    else{
      code = 'setRotationStyle(sprite, "' + dropdown_options + '");\n';
    }
    return code;
};
