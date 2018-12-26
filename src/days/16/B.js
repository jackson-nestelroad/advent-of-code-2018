'use strict';

import fs from 'fs'
import { Registry, Instructions } from './Classes'
import Algorithms from '../../classes/Algorithms'

const Solution = {
    solve: function(file = "input.txt"){
        let input = this.readFile(file).split('\n\n\n\n');

        let samples = input[0]
            .split('\n\n')
            .map(group => group.split('\n'))
            .map(instr => instr.map(x => this.parseNumbers(x)));

        let instructions = input[1]
            .split('\n')
            .map(instr => this.parseNumbers(instr));
        instructions = instructions.slice(0, instructions.length - 1);
        
        let registry = new Registry(4);

        let Translations = new Map();

        // For each sample case
        for(let [before, params, after] of samples){
            let opcode = params.shift();
            if(!Translations.has(opcode))
                Translations.set(opcode, new Set());
            // Test each instruction on the sample case
            for(let instr of Object.keys(Instructions)){
                registry.setAll(before);
                Instructions[instr](registry, ...params);
                // Instruction produced expected result
                if(registry.toString() == after.toString()){
                    Translations.get(opcode).add(instr);
                }
                else{
                    Translations.get(opcode).delete(instr);
                }
            }
        }

        // Order opcodes by their number of possible instructions
        let order =  new Set([...Translations.keys()].sort((a, b) => {
            return Translations.get(a).size - Translations.get(b).size;
        }));

        // Perfect match algorithm
        let assigned = { };
        let iterator;
        let value;
        while(Translations.size){
            for(let opcode of order){
                iterator = Translations.get(opcode).values();
                while(value = iterator.next().value){
                    if(assigned[value] !== undefined)
                        Translations.get(opcode).delete(value);
                }
                if(Translations.get(opcode).size == 1){
                    assigned[Translations.get(opcode).values().next().value] = opcode;
                    Translations.delete(opcode);
                    order.delete(opcode);
                }
            }
        }

        // Invert key-value pair
        let Opcodes = Algorithms.invert(assigned);

        // Reset registry
        registry.fill();
        // Run each instruction
        let opcode;
        for(let instr of instructions){
            opcode = instr.shift();
            Instructions[Opcodes[opcode]](registry, ...instr);
        }
        return registry.get(0);
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