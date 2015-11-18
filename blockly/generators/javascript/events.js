'use strict';

goog.provide('Blockly.JavaScript.events');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['events_when_run_clicked'] = function(block) {
    // TODO Assemble JavaScript into code variable.
    var code = '// hat\n';
    return code;
};

Blockly.JavaScript['events_when_key_press'] = function(block) {
    // TODO implement functionality
    var code = '// key press\n';
    return code;
};

Blockly.JavaScript['events_when_sprite_clicked'] = function(block) {
    // TODO implement functionality
    var code = '// sprite click\n';
    return code;
};

Blockly.JavaScript['events_when_backdrop_switched'] = function(block) {
    // TODO implement functionality
    var code = '// backdrop switch\n';
    return code;
};

Blockly.JavaScript['events_when_compared'] = function(block) {
    // TODO implement functionality
    var code = '// compare\n';
    return code;
};


Blockly.JavaScript['events_when_receive'] = function(block) {
    // TODO implement functionality
    var code = '// recieve\n';
    return code;
};

/*fix all the calls above*/
Blockly.JavaScript['events_broadcast'] = function(block) {
  var dropdown_messages = block.getFieldValue('messages');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};

Blockly.JavaScript['events_broadcast_wait'] = function(block) {
  var dropdown_messages = block.getFieldValue('messages');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};