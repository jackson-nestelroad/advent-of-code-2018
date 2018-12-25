'use strict';

import fs from 'fs'
import { Game } from './Classes'
 
const Solution = {
    solve: function(file = "input.txt"){
        // Read and parse map from input file
        let map = this.readFile(file).split('\n');
        map = map.slice(0, map.length - 1).map(val => val.split(''));
        let game = new Game(map);
        return game.start();
    },

    readFile: function(file = "input.txt"){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },
}

export default Solution;