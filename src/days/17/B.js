'use strict';

import fs from 'fs'
import { Coordinate, Tiles as _ } from './Classes'

const Solution = {
    solve: function(file = "input.txt"){
        let input = this.readFile(file).split('\n');
        input.splice(-1);
        this.initialScan(input);

        let start = new Coordinate(500, 0);
        while(start.y < this.Y.min)
            start = start.down();

        this.flow(start);
        
        // this.output();

        // Count number of water tiles
        let waterTiles = 0;
        Object.values(this.map).map(tile => {
            if(tile == _.WATER)
                waterTiles++;
        });
        return waterTiles;

    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    // Parse input into map
    initialScan(input){
        this.map = { };
        let dir1, row, dir2, range;
        let coord;
        this.Y = { min: Number.MAX_SAFE_INTEGER, max: 0 };
        for(let scan of input){
            // Parse input
            [[dir1, row], [dir2, range]] = scan.split(', ').map(s => s.split('='));
            range = range.split('..').map(n => Number(n));
            row = Number(row);

            // X is constant
            if(dir1 == 'x'){
                // Check if range extends
                if(range[0] < this.Y.min)
                    this.Y.min = range[0];
                if(range[1] > this.Y.max)
                    this.Y.max = range[1];

                // Set each tile as clay
                coord = new Coordinate(row, range[0]);
                while(coord.y <= range[1]){
                    this.map[coord] = _.CLAY;
                    coord = coord.down();
                }
            }   
            // Y is constant
            else{
                // Check if range extends
                if(row < this.Y.min)
                    this.Y.min = row;
                else if(row > this.Y.max)
                    this.Y.max = row;

                // Set each tile as clay
                coord = new Coordinate(range[0], row);
                while(coord.x <= range[1]){
                    this.map[coord] = _.CLAY;
                    coord = coord.right();
                }
            }
        }
    },

    // Recursive function to flow water downwards
    // Returning true recurses back upwards
    // Returning false pushes the water left and right
    // Returns coordinate of wall if traversing sideways (dir != undefined)
    flow: function(coord, dir){
        // Hit max point
        if(coord.y > this.Y.max)
            return true;

        // Hit a wall
        // If we are moving sideways, record where the wall is
        // If we are moving downards, return false to push water sideways
        if(this.map[coord] == _.CLAY || this.map[coord] == _.WATER)
            return dir ? coord : false;

        // Merged with another stream
        if(!dir && this.map[coord] == _.STREAM)
            return true;

        // Water a new location
        this.map[coord] = _.STREAM;
        
        // Moving sideways until we hit a wall
        if(dir){
            if(this.map[coord.down()] != _.SAND)
                return this.flow(coord.right(dir), dir);
        }

        // Move down
        if(!this.flow(coord.down())){
            // Merging with another stream, recurse back up
            if(this.map[coord.down()] == _.STREAM)
                return true;

            // Find left wall
            let left = this.flow(coord.left(), -1);

            // Find right wall
            let right = this.flow(coord.right(), 1);

            // Found coordinates for two walls
            if(left.constructor == Coordinate && right.constructor == Coordinate){
                // Flood the area between the walls
                for(let x = left.x + 1; x < right.x; x++){
                    this.map[new Coordinate(x, left.y)] = _.WATER;
                }
            }
            // Recurse back up
            return false;
        }
        // If we hit water, recurse back up
        return this.map[coord.down()] != _.WATER;
    },

    output: function(){
        let print = new Array(this.Y.max + 1).fill(0).map(x => new Array(1000).fill('.'));
        Object.keys(this.map).map(tile => {
            let [x, y] = tile.split('x');
            print[Number(y)][Number(x)] = this.map[tile];
        });
        fs.writeFileSync(`${__dirname}/output.txt`, `${print.map(x => x.join('')).join('\n')}`);
    }

}

export default Solution;