'use strict';

import fs from 'fs'
import { Instruction } from './Classes'
 
const Solution = {
    solve: function(){
        // Get and parse input
        let input = this.readFile().split('\n');
        input.splice(-1);

        // Parse and format input
        let parsedInput = input.map(str => this.parse(str));
        let instructions = this.formatInstructions(parsedInput);

        // Start our queue with instructions with no dependencies
        let letters = Object.keys(instructions).sort();
        let queue = { };
        letters.forEach(letter => {
            if(instructions[letter].before.length == 0)
                queue[letter] = true;
        });

        // Put our five elves to work
        let workers = 5;
        let time = this.getToWork(instructions, queue, workers);
        return time;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    parse: function(instruction){
        return [instruction[5], instruction[36]];
    },

    formatInstructions: function(input){
        let instructions = { };
        input.forEach(instruction => {
            let id = instruction[0];
            let after = instruction[1];
            
            if(!instructions[id])
                instructions[id] = new Instruction(id);
            instructions[id].after.push(after);

            if(!instructions[after])
                instructions[after] = new Instruction(after);
            instructions[after].before.push(id);
        });
        return instructions;
    },

    getToWork: function(instructions, queue, workers = 1){
        // Object to hold what is being worked on
        let working = { };
        let time = -1;

        // Lamba to check if we have finished all the instructions
        const finished = () => {
            return Object.keys(instructions).map(letter => instructions[letter].isDone()).every(val => val === true);
        }

        while(!finished()){
            time++;

            // Check if we have finished an instruction being worked on
            Object.keys(working).forEach(letter => {
                if(time - instructions[letter].started >= instructions[letter].duration()){
                    // Finish it and remove it
                    instructions[letter].finish();
                    workers++;
                    delete working[letter];
                    console.log(time, "Finished", letter);

                    // Check if dependent instructions are ready to be worked
                    instructions[letter].after.forEach(letter => {
                        let dependencies = instructions[letter].before.map(letter => instructions[letter].isDone());
                        let ready = dependencies.every(bool => bool === true);
                        if(ready){
                            queue[letter] = true;
                        }
                    });
                }
            });

            // Put available workers to work on instructions in the queue
            while(workers != 0 && Object.keys(queue).length != 0){
                let next = Object.keys(queue).sort().shift();
                delete queue[next];
                working[next] = true;
                console.log(time, "Starting", next);
                instructions[next].startWorking(workers--, time);
            }
        }
        return time;
    }
}

export default Solution;