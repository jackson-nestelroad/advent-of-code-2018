'use strict';

import fs from 'fs'
import { Registry, Instruction } from './Classes'

const Solution = {
    solve: function(file = "input.txt"){
        // Parse code
        let code = this.readFile(file).split('\n');
        code = code.slice(0, code.length - 1);
        const REGISTERS = 6;

        // Initialize registry
        let registry = new Registry(REGISTERS);
        registry.set(0, 1);

        // Run IPDirective
        let IPDirective = Instruction.parse(code.shift());
        if(IPDirective.type != "ip")
            throw "First line must initialize instruction pointer.";
        IPDirective.run(registry);
 
        // Create an instruction from each code
        code = code.map(i => Instruction.parse(i, registry.ip));

        let history = new Set();
        let ip;
        let bigNum;
        
        // Run until we finish or find the loop
        while((ip = registry.getIP()) < code.length && !bigNum){
            // We have been to this instruction before... must be a loop
            if(history.has(ip))
                bigNum = Math.max(...registry.registers);
            else
                history.add(ip)

            // Run instruction
            code[ip].run(registry);

            // Move to next instruction
            registry.nextIP();
        }

        // The input given calculates the sum of all factors of a number (bigNum)
        // via an inner and outer loop

        // I was going to try to create a Loop class that will identify the end
        // condition of the identified loop, but it ended up being too specialized
        // and too difficult to effectively calculate end conditions and if conditions

        // In the end, it was easier to just reverse engineer the input code and
        // write what it is really doing
        let sum = 0;
        for(let n = 0; n <= bigNum; n++)
            if(bigNum % n == 0)
                sum += n;
        return sum;
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    }
}

export default Solution;