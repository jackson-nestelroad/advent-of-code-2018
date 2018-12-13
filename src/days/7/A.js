'use strict';

import fs from 'fs'
 
const Solution = {
    solve: function(){
        // Get and parse input
        let input = this.readFile().split('\n');
        input.splice(-1);
        let parsedInput = input.map(str => this.parse(str));

        // Format input as objects that link to each other
        let instructions = this.formatInstructions(parsedInput);

        // Get commands that are ready to be executed
        let letters = Object.keys(instructions).sort();
        let queue = { };
        letters.forEach(letter => {
            if(instructions[letter].before.length == 0)
                queue[letter] = true;
        });

        // First command is the first in the queue
        let first = Object.keys(queue).sort().shift();
        delete queue[first];

        // Get the order of commands
        let order = Solution.execute(first, instructions, queue);
        return order;
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
            let now = instruction[0];
            let after = instruction[1];
            if(!instructions[now]){
                instructions[now] = {
                    before: [],
                    after: [after],
                    done: false
                };
            }
            else{
                instructions[now].after.push(after);
            }
            if(!instructions[after]){
                instructions[after] = {
                    before: [now],
                    after: [],
                    done: false
                }
            }
            else{
                instructions[after].before.push(now);
            }
        });
        return instructions;
    },

    execute: function(letter, instructions, startingQueue = { }){
        // Order of commands that will be returned
        let order = "";

        // Static queue object to hold commands that are ready to be executed
        this.execute.queue = this.execute.queue ? this.execute.queue : startingQueue;

        // Run dependent commands
        instructions[letter].before.sort().forEach(cmd => {
            if(!instructions[cmd].done)
                order += this.execute(cmd, instructions);
        });

        // Run current command if it is not already done
        if(!instructions[letter].done){
            order += letter;
            instructions[letter].done = true;

            // Make the dependent commands available in the queue if they are ready
            instructions[letter].after.forEach(letter => {
                if(!instructions[letter].done && !this.execute.queue[letter]){
                    // Check if all dependent commands are done
                    let ready = true;
                    instructions[letter].before.forEach(letter => ready = ready && instructions[letter].done);
                    if(ready)
                        this.execute.queue[letter] = true;
                }
            });
        }

        // Run next command
        let queue = Object.keys(this.execute.queue);
        while(queue.length){
            let current = queue.sort().shift();
            delete this.execute.queue[current];
            if(!instructions[current].done){
                order += this.execute(current, instructions);
            }
        }
        return order;
    }
}

export default Solution;