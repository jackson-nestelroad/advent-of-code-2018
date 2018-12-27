'use strict';

import fs from 'fs'

const Solution = {
    solve: function(file = "input.txt"){
        let field = this.readFile(file).split('\n');
        field = field.slice(0, field.length - 1)
        field = field.map(row => row.split(''));

        let min = 1;
        let time = 1e9;
        let newField;
        let history = { };
        let begin, end;

        // Search for a time where history repeats itself
        for(min; min <= time; min++){
            newField = this.transform(field);
            // We have seen this exact field before!
            if(history[newField]){
                // Save beginning and end
                begin = history[newField];
                end = min;
                // Keep the history that loops infinitely
                history = Object.entries(history)
                    .filter(([key, val]) => val >= begin && val < end)
                    .map(([key, val]) => key);
                break;
            }
            // Keep iterating
            else{
                history[newField] = min;
                field = newField;
            }
        }
        // Where the time we want lies along the infinite loop
        let i = (time - end) % (end - begin);
        return this.getWorth(history[i]);

    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    adjacent: function(field, Y, X){
        let adjacents = { };
        for(let y = Y - 1; y <= Y + 1; y++){
            for(let x = X - 1; x <= X + 1; x++){
                if(y < 0 || x < 0 || y >= field.length || x >= field[y].length)
                    continue;
                if(x == X && y == Y)
                    continue;
                adjacents[field[y][x]] = adjacents[field[y][x]] ? adjacents[field[y][x]] + 1 : 1;
            }
        }
        return adjacents;
    },

    transform: function(field){
        let newField = field.slice(0).map(a => a.slice(0));
        let adjacents = { };
        let tile;
        for(let y = 0; y < field.length; y++){
            for(let x = 0; x < field.length; x++){
                tile = field[y][x];
                adjacents = this.adjacent(field, y, x);
                // Open ground
                if(tile == '.'){
                    if(adjacents['|'] >= 3)
                        newField[y][x] = '|';
                    else
                        newField[y][x] = tile;
                }
                // Trees
                else if(tile == '|'){
                    if(adjacents['#'] >= 3)
                        newField[y][x] = '#';
                    else
                        newField[y][x] = tile;
                }
                // Lumberyard
                else if(tile == '#'){
                    if(adjacents['#'] >= 1 && adjacents['|'] >= 1)
                        newField[y][x] = tile;
                    else
                        newField[y][x] = '.';
                }
            }
        }
        return newField;
    },

    getWorth: function(fieldString){
        let trees = fieldString.match(/\|/g).length;
        let lumberyards = fieldString.match(/\#/g).length;
        return trees * lumberyards;
    }
}

export default Solution;