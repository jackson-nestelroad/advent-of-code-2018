'use strict';

import fs from 'fs';

const Solution = {
    solve: function(){
        let deltas = this.readFile().split('\n');
        return this.getDuplicate(deltas.slice(0, deltas.length - 1));
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    getDuplicate: function(deltas){
        let frequency = 0;
        let frequencies = { 0: true };
        let found = false;
        while(!found){
            for(let change of deltas){
                frequency += Number(change);
                if(frequencies[frequency]){
                    found = true;
                    break;
                }
                frequencies[frequency] = true;
            }
        }
        return frequency;
    }
}

export default Solution;