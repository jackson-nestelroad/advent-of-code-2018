'use strict';

import fs from 'fs'
import { Coordinate, Cave } from './ClassesA'

const Solution = {
    solve: function(file = "input.txt"){
        // Parse input
        let input = this.readFile(file);
        let [depth, ...target] = this.parseNumbers(input);
        target = new Coordinate(target[0], target[1]);

        // Create the cave
        let cave = new Cave(target.x, target.y, depth, target);

        // Add up sum of risk levels
        return Object.keys(cave.map).reduce((sum, a) => sum += cave.map[a].type, 0);
        
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