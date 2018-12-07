'use strict';

import fs from 'fs';

const Solution = {
    solve: function(){
        let deltas = this.getFile().split('\n');
        return this.getDuplicate(deltas.slice(0, deltas.length - 1));
    },

    getFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    getDuplicate: function(deltas){
        let frequency = 0;
        let frequencies = [frequency];
        let found = false;
        while(!found){
            for(let change of deltas){
                frequency += Number(change);
                if(frequencies.includes(frequency)){
                    found = true;
                    break;
                }
                frequencies.push(frequency);
            }
        }
        return frequency;
    }
}

export default Solution;