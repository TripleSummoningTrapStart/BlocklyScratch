/**
 * Control blocks
 * Created by Dominik Haeflinger on 9/13/2015
 *
 * 9/13/15: Created control_wait
 * 
 */

'use strict';

goog.provide('Blockly.Blocks.control');

goog.require('Blockly.Blocks');

Blockly.Blocks['control_wait'] = {
    /**
     * Block for waiting n seconds (external number).
     * @this Blockly.Block
     */
    init: function() {
        this.appendDummyInput()
            .appendField("wait")
            .appendField(new Blockly.FieldTextInput('1',
                Blockly.FieldTextInput.numberValidator), "length")
            .appendField("secs");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip(Blockly.Msg.CONTROL_WAIT_TOOLTIP);
        this.setHelpUrl('http://www.example.com/');
    }
};