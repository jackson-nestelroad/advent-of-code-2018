'use strict';

import fs from 'fs'
import Marbles from './Classes'
 
const Solution = {

    // The only difference I made between part A and part B was implementing the
    // solution as a doubly circular linked list opposed to a simple singly linked list.
    solve: function(){
        let input = this.readFile();
        let numbers = this.parseNumbers(input);
        let players = numbers[0];
        let marbles = numbers[1] * 100;

        let scores = this.startGame(players, marbles);
        return Math.max(...scores);
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    parseNumbers: function(string){
        let array = [];
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match;
        while(match = regex.exec(string))
            array.push(Number(match[0]));
        return array;
    },

    startGame: function(players, marbles){
        let scores = new Array(players).fill(0);
        let Game = new Marbles();
        let player = 0;
        for(let k = 0; k <= marbles; k++){
            scores[player] += Game.placeMarble(k);
            player = (player + 1) % players;
        }
        return scores;
    }
}

export default Solution;