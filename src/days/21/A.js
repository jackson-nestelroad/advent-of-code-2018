'use strict';

import fs from 'fs'
import { Registry, Instruction } from './Classes'

const Solution = {
    solve: function(file = "input.txt"){
        // Parse code
        let code = this.readFile(file).split('\n');
        code = code.slice(0, code.length - 1);

        // Initialize registry and instruction pointer
        // #ip is the first command
        let registry = new Registry(6);

        // Run IPDirective
        let IPDirective = Instruction.parse(code.shift());
        if(IPDirective.type != "ip")
            throw "First line must initialize instruction pointer.";
        IPDirective.run(registry);

        // Parse the rest of the code
        code = code.map(str => Instruction.parse(str, registry.ip));

        // The end condition to get out of the code
        let end = code.length - 3;

        // Run code
        let ip;
        while((ip = registry.getIP()) < code.length){
            // We are at the end condition, return what value makes the end condition true
            if(ip == end){
                let [A, B, C] = code[end].args;
                if(code[end].opcode.startsWith('eq'))
                    return A == 0 ? registry.get(B) : registry.get(A);
                else if(code[end].opcode.startsWith('gt'))
                    return A == 0 ? registry.get(B) + 1 : registry.get(A) + 1;
            }
            code[ip].run(registry);
            registry.nextIP();
        }
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },
}

export default Solution;