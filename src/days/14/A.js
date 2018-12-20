'use strict';

import fs from 'fs'
import Scores from './Classes'
 
const Solution = {
    solve: function(){
        let recipes = Number(this.readFile());
        const outputLength = 10;
        let scores = new Scores();
        let elf1 = scores.addNode(3);
        let elf2 = scores.addNode(7);

        while(scores.getSize() < recipes + outputLength){
            let score = elf1.element + elf2.element;
            if(score < 10)
                scores.add(score);
            else{
                scores.add(Math.floor(score / 10));
                scores.add(score % 10);
            }
            elf1 = scores.move(elf1.element + 1, elf1);
            elf2 = scores.move(elf2.element + 1, elf2);
        }
        let offset = -1 * (scores.getSize() - recipes);
        let start = scores.move(offset);
        return scores.printAsString(10, start);
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    }
}

export default Solution;