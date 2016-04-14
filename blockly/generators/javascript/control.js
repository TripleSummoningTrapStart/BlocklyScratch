/**
 * @fileoverview Generating JavaScript for control blocks.
 * @author dominikh@ksue.edu (Dominik Haeflinger)
 */
'use strict';

goog.provide('Blockly.JavaScript.control');

goog.require('Blockly.JavaScript');

/*
Blockly.JavaScript['control_wait'] = function(block) {
    var text_length = block.getFieldValue('length');
    var after = block.getNextBlock();
    var after_code = '';
    var code = 'window.setTimeout(function() { \n';
    while (after != null)
    {
        after_code += '\n' + Blockly.blockToCode(after);
        after = after.getNextBlock();
    }
    code += after_code + '\n}, ' + (1000 * text_length) + ');';
    //var code = 'var start = new Date().getTime(); \nvar delay = ' + (1000 * text_length) + ';\n' +
    //    'while (new Date().getTime() < start + delay);\n';
    return code;
};*/

Blockly.JavaScript['control_wait_until'] = function(block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var code = "";
    if(!downloadingCode){
      code = 'while (!' + value_condition + ') {};\n';
    }
    return code;
};
