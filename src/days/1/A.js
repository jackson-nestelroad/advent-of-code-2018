'use strict';

import fs from 'fs';

const Solution = {
    solve: function(){
        let deltas = this.readFile().split('\n');
        return this.calculateFrequency(deltas);
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    calculateFrequency: function(deltas){
        let frequency = 0;
        deltas.forEach(change => frequency += Number(change));
        return frequency;
    }
}

export default Solution;