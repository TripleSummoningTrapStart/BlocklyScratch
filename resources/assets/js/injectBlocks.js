/**
 * Created by Dominik on 11/2/2015.
 * Originally in d3 by Joshua Weese (weeser@ksu.edu)
 */
'use strict';

function loadAllBlocks() {
    var blocks = [];
    var cats = {};

    for (var block in Blockly.Blocks) {

        try {
            if (Blockly.Blocks[block].hasOwnProperty("init")) {
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
        if(Blockly.Blocks[cat].hasOwnProperty("HUE")){ // Doesn't do anything
            category.setAttribute("colour", Blockly.Blocks[cat].HUE);
        }
        doc_toolbox.appendChild(category);
        //d3.select("#toolbox").append("category").attr("id", "cat" + cat).attr("name", cat);
    }

    for (var block in blocks) {
        /* puts every block into an all category
            var doc_catAll = document.getElementById('catAll');
            document.getElementById("#catAll").append("block").attribute("type", blocks[block]);
            d3.select("#catAll").append("block").attr("type", blocks[block]);*/
        var s = blocks[block].split('_');
        if (s.length > 0 && cats.hasOwnProperty(s[0])) {
            var parentCat = document.getElementById("cat" + s[0]);
            var blockElement = document.createElement("block");
            blockElement.setAttribute("type", blocks[block]);
            parentCat.appendChild(blockElement);
            //d3.select("#cat" + s[0]).append("block").attr("type", blocks[block]);
            cats[s[0]] += 1;
        } else {
            console.log(blocks[block]);
            //document.getElementById("#catOther").append("block").attribute("type", blocks[block]);
            //d3.select("#catOther").append("block").attr("type", blocks[block]);
        }
    }

    for (var cat in cats) {
        if (cats[cat] === 0) {
            document.getElementById("cat" + cat).remove(); // Is not supported in IE
            //d3.select("#cat" + cat).remove();
        }
    }
}