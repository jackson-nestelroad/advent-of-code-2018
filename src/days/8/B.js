'use strict';

import fs from 'fs'
 
const Solution = {
    solve: function(){
        // Get and parse input
        let input = this.readFile().split(' ').map(val => Number(val));
        return this.getValue(input);
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    getValue: function(array){
        let value = 0;
        let childValues = [];
        let children = array.shift();
        let numMeta = array.shift();

        for(let child = 0; child < children; child++){
            let value = this.getValue(array);
            childValues.push(value);
        }
        if(!children){
            for(let meta = 0; meta < numMeta; meta++){
                value += array.shift();
            }
        }
        else{
            for(let meta = 0; meta < numMeta; meta++){
                let child = array.shift();
                if(!(child > childValues.length))
                    value += childValues[child - 1];
            }
        }
        return value;
    }
}

export default Solution;