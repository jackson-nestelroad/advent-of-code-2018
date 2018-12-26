'use strict';

import fs from 'fs'
import { Registry, Instructions } from './Classes'

const Solution = {
    solve: function(file = "input.txt"){
        let instructions = this.readFile(file)
            .split('\n\n\n\n')[0]
            .split('\n\n')
            .map(group => group.split('\n'))
            .map(instr => instr.map(x => this.parseNumbers(x)));
        let registry = new Registry(4);

        let total = 0;
        let count;
        for(let [before, params, after] of instructions){
            count = 0;
            for(let instr of Object.keys(Instructions)){
                registry.setAll(before);
                Instructions[instr](registry, ...params.slice(1));
                if(registry.toString() == after.toString())
                    count++;

                if(count >= 3){
                    total++;
                    break;
                }
            }
        }
        return total;
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    parseNumbers: function(string){
        let array = [];
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match;
        while(match = regex.exec(string))
            array.push(Number(match[0]));
        return array;
    },
}

export default Solution;