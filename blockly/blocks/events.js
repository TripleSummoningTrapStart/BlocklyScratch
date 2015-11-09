/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Blocks.procedures.HUE = 20;

Blockly.Blocks['procedures_hat_when_run_clicked'] = {
  /**
   * Block for determining the beginning of code to be run
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("when 'Run' clicked");
	Blockly.BlockSvg.START_HAT = true;
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');

  }
};