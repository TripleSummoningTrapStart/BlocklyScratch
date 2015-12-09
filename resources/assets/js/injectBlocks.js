/**
 * Created by Dominik on 11/2/2015.
 * Originally in d3 by Joshua Weese (weeser@ksu.edu)
 */
'use strict';

/*Method to dynamically load the blockly blocks into a toolbox */
function loadAllBlocks() {
    var blocks = [];
    var cats = {};
	var invalid = ["control_repeat", "control_for", "control_forEach", "texts_prompt", "texts_create_join_container", "texts_create_join_item", "lists_create_with_container", "lists_create_with_item", "control_if_if", "control_if_elseif", "control_if_else", "procedures_mutatorcontainer", "procedures_mutatorarg","procedures_callnoreturn", "procedures_callreturn"];
    for (var block in Blockly.Blocks) {

        try {
            if (Blockly.Blocks[block].hasOwnProperty("init")&&invalid.indexOf(block)==-1) {
                blocks.push(block);
            } else {
                cats[block] = 0;
            }
        } catch(e) {
            console.log(e)
        }
    }

    var doc_toolbox = document.getElementById('toolbox');
    for (var cat in cats) {
        var category = document.createElement("category");
        category.setAttribute("id", "cat" + cat);
        category.setAttribute("name", cat);
        if(Blockly.Blocks[cat].hasOwnProperty("HSV_HUE")
            && Blockly.Blocks[cat].hasOwnProperty("HSV_SATURATION")
            && Blockly.Blocks[cat].hasOwnProperty("HSV_VALUE")){
            category.setAttribute("colour",
                [Blockly.Blocks[cat].HSV_HUE, Blockly.Blocks[cat].HSV_SATURATION, Blockly.Blocks[cat].HSV_VALUE]);
        }
        doc_toolbox.appendChild(category);
    }

    for (var block in blocks) {
        var s = blocks[block].split('_');
        if (s.length > 0 && cats.hasOwnProperty(s[0])) {
            var parentCat = document.getElementById("cat" + s[0]);
            var blockElement = document.createElement("block");
            blockElement.setAttribute("type", blocks[block]);
            parentCat.appendChild(blockElement);
            cats[s[0]] += 1;
        } else {
            console.log(blocks[block]);
        }
    }

    for (var cat in cats) {
        if (cats[cat] === 0) {
            document.getElementById("cat" + cat).remove(); // remove() is not supported in IE
        }
    }
}