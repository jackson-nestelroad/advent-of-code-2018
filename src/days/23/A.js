'use strict';

import fs from 'fs'
import { Nanobot } from './Classes'

const Solution = {
    solve: function(file = "input.txt"){
        // Parse input
        let input = this.readFile(file).split('\n').slice(0, -1);
        input = input.map(str => this.parseNumbers(str));

        // Create nanobots from input
        let nanobots = input.map(a => new Nanobot(...a));

        // Get strongest nanobot
        let strongest = { radius: 0 };
        for(let i = 0; i < nanobots.length; i++)
            strongest = nanobots[i].radius > strongest.radius ? nanobots[i] : strongest;

        // Find number of bots in range
        let inRange = nanobots.filter(bot => strongest.inRange(bot));
        return inRange.length;
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    parseNumbers: function(string){
        let array = [];
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match;
        while(match = regex.exec(string))
            array.push(Number(match[0].replace(',', '')));
        return array;
    },
}

export default Solution;