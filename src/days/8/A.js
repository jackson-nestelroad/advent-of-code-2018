'use strict';

import fs from 'fs'
 
const Solution = {
    solve: function(){
        // Get and parse input
        let input = this.readFile().split(' ').map(val => Number(val));

        return this.sumMetadata(input);
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    sumMetadata: function(array){
        let sum = 0;
        let children = array.shift();
        let numMeta = array.shift();
        for(let child = 0; child < children; child++){
            sum += this.sumMetadata(array);
        }

        for(let meta = 0; meta < numMeta; meta++){
            sum += array.shift();
        }
        return sum;
    }
}

export default Solution;