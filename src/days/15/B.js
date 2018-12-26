'use strict';

import fs from 'fs'
import { Game } from './Classes'
 
const Solution = {
    solve: function(file = "input.txt"){
        // Read and parse map from input file
        let map = this.readFile(file).split('\n');
        map = map.slice(0, map.length - 1).map(val => val.split(''));
        let game;
        let ap = 3;
        let score = false;
        let copiedMap;
        do{
            copiedMap = map.map(y => y.map(x => x));
            game = new Game(copiedMap, "B", ++ap);
            score = game.start();
        } while(!score);
        return score;
    },

    readFile: function(file = "input.txt"){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },
}

export default Solution;