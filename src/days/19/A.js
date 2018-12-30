'use strict';

import fs from 'fs'
import { Registry, Instruction } from './Classes'

const Solution = {
    solve: function(file = "input.txt"){
        // Parse code
        let code = this.readFile(file).split('\n');
        code = code.slice(0, code.length - 1);
        code = code.map(i => this.parseInstruction(i));

        // Initialize registry and instruction pointer
        // #ip is the first command
        let registry = new Registry(6);
        code.shift().run(registry);

        // Run code
        let ip;
        while((ip = registry.getIP()) < code.length){
            code[ip].run(registry);
            registry.nextIP();
        }
        return registry;
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    parseInstruction: function(string){
        string = string.split(' ');
        return new Instruction(string.shift(), string.map(val => Number(val)));
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