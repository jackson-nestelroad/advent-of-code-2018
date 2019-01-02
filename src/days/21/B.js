'use strict';

import fs from 'fs'

const Solution = {
    solve: function(file = "input.txt"){
        // Get first end condition
        let five = this.runLoop();
        // Record when end conditions loop
        let values = { five: true };
        let next;
        // Run the code's loop until a value is repeated
        while(next = this.runLoop(five | 65536, 9010242)){
            if(!values[next])
                values[next] = true;
            // A value has been repeated, so return the last value before the repitition begins
            else
                return five;
            five = next;
        }
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    // Reverse engineered version of the loop that runs before the code's end condition
    // The value to satisfy the end condition is returned
    runLoop: function(three = 65536, five = 9010242){
        five += three & 255;
        five &= 16777215;
        five *= 65899;
        five &= 16777215;
        if(256 > three)
            return five;
        else
            return this.runLoop(Math.floor(three / 256), five);
    }
}

export default Solution;