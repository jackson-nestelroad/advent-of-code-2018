'use strict';

import fs from 'fs'
import Scores from './Classes'
 
const Solution = {
    solve: function(combo = this.readFile()){
        let comboFound = false;
        let currentCombo = "";

        let scores = new Scores();
        let elf1 = scores.addNode(3);
        let elf2 = scores.addNode(7);
        currentCombo += elf1.element;
        currentCombo += elf2.element;

        while(!comboFound){
            let score = elf1.element + elf2.element;
            if(score < 10)
                currentCombo += scores.add(score);
            else{
                currentCombo += scores.add(Math.floor(score / 10));
                currentCombo += scores.add(score % 10);
            }

            while(currentCombo.length >= combo.length){
                if(currentCombo.substr(0, combo.length) == combo)
                    return scores.getSize() - currentCombo.length;
                else
                    currentCombo = currentCombo.substring(1);
            }

            elf1 = scores.move(elf1.element + 1, elf1);
            elf2 = scores.move(elf2.element + 1, elf2);
        }
        return false;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    }
}

export default Solution;