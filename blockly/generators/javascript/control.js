/**
 * @fileoverview Generating JavaScript for control blocks.
 * @author dominikh@ksue.edu (Dominik Haeflinger)
 */
'use strict';

goog.provide('Blockly.JavaScript.control');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['control_wait'] = function(block) {
    var text_length = block.getFieldValue('length');
    var code = 'var start = new Date().getTime(); \nvar delay = ' + (1000 * text_length) + ';\n' +
        'while (new Date().getTime() < start + delay);\n';
    return code;
};