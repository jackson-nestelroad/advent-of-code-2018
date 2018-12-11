'use strict';

import fs from 'fs'
 
const Solution = {
    solve: function(){
        let input = this.readFile().trim();
        let reduced = this.react(input);
        return reduced.length;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    react: function(polymer){
        let index = 0;
        while(index < polymer.length - 1){
            if(polymer[index].toLowerCase() == polymer[index + 1].toLowerCase() && polymer[index] != polymer[index + 1]){
                polymer = polymer.substring(0, index) + polymer.substring(index + 2);
                index = index ? index - 1 : index;
            }
            else{
                index++;
            }
        }
        return polymer;
    }
}

export default Solution;