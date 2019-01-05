'use strict';

import fs from 'fs'
import { Nanobot, Coordinate, Cube } from './Classes'
import Heap from '../../classes/PriorityQueue'

const Solution = {
    solve: function(file = "input.txt"){
        // Parse input
        let input = this.readFile(file).split('\n').slice(0, -1);
        input = input.map(str => this.parseNumbers(str));

        // Create nanobots from input
        let nanobots = input.map(a => new Nanobot(...a));

        // Average point between all nanobots
        let avg = new Coordinate(
            Math.floor(nanobots.reduce((sum, bot) => sum += bot.x, 0) / nanobots.length),
            Math.floor(nanobots.reduce((sum, bot) => sum += bot.y, 0)  / nanobots.length),
            Math.floor(nanobots.reduce((sum, bot) => sum += bot.z, 0)  / nanobots.length)
        )

        // Get max and min of all coordinates
        let map = nanobots.map(bot => bot.x);
        let X = {
            min: Math.min(...map),
            max: Math.max(...map)
        }
        map = nanobots.map(bot => bot.y);
        let Y = {
            min: Math.min(...map),
            max: Math.max(...map)
        }
        map = nanobots.map(bot => bot.z);
        let Z = {
            min: Math.min(...map),
            max: Math.max(...map)
        }

        // Get size of search area
        let size = Math.max(...[
            Math.abs(X.max - X.min),
            Math.abs(Y.max - Y.min),
            Math.abs(Z.max - Z.min)
        ]);

        // Get bots in range
        let bots = nanobots.filter(bot => bot.inRange(avg)).length;

        // Get distance to origin
        const origin = new Coordinate(0, 0, 0);
        let distance = avg.distance(origin);

        // Get priority and create heap
        let priority = Number.MAX_SAFE_INTEGER - size + bots;
        let heap = new Heap();
        heap.enqueue(new Cube(avg, size, bots), priority);

        // Run until we land at a single point
        let searchArea;
        while(!heap.isEmpty()){
            // Get next search area in queue
            searchArea = heap.dequeue();
            // We have reached a single point
            if(searchArea.size == 0)
                break;
            // Look at all points in the cube
            searchArea.createPoints().forEach(point => {
                bots = nanobots.filter(bot => bot.inRange(point)).length;
                distance = point.distance(origin);
                
                // Number of bots is much more important than distance from origin
                priority = bots ** 5 - distance;
                heap.enqueue(new Cube(point, Math.floor(searchArea.size / 2), bots), priority);
            });
        }
        return searchArea.center.distance(origin);
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