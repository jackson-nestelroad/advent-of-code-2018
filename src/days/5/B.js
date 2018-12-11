'use strict';

import fs from 'fs'
import { Polymer } from './Classes';
 
const Solution = {
    solve: function(){
        let input = this.readFile().trim();
        let polymer = new Polymer(input);
        let shortest = Infinity;
        for(let letter = 65; letter < 91; letter++){
            let reacted = polymer.remove(String.fromCharCode(letter)).react();
            if(reacted.value.length < shortest)
                shortest = reacted.value.length;
        }
        return shortest;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },
}

export default Solution;