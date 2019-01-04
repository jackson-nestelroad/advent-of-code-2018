'use strict';

import fs from 'fs'
import { State, Cave, Tools } from './ClassesB'
import PriorityQueue from '../../classes/PriorityQueue'

const Solution = {
    solve: function(file = "input.txt"){
        // Parse input
        let input = this.readFile(file);
        let [depth, ...targets] = this.parseNumbers(input);
        // Target to get to
        let target = new State(targets[0], targets[1], Tools.TORCH);

        // Create the cave
        let cave = new Cave(target.x + 30, target.y + 10, depth, target);

        // Create initial state
        let current = new State(0, 0, Tools.TORCH);
        cave.map[current].time = 0;
        let prev = new State(-1, 0, Tools.TORCH);
        let time = 0;
        let f = current.distance(target);

        // Create a Priority Queue to build a queue based on f value of state
        let queue = new PriorityQueue();
        queue.enqueue([current, prev, time], f);
        
        let cost;
        let newTime;
        // Run until we have looked at all points
        while(!queue.isEmpty()){
            [current, prev, time] = queue.dequeue();

            // We have reached our destination
            if(current.toString() == target.toString())
                break;

            // Look at all of the adjacent regions
            current.adjacent().filter(state => cave.map[state]).forEach(next => {
                // Don't go backwards
                if(next.toString() == prev.toString());
                else{
                    // Tool change
                    if(current.t != next.t)
                        cost = 7;
                    // Simple movement
                    else
                        cost = 1;

                    // Calculate new time here
                    newTime = time + cost;
                    // New best time
                    if(newTime < cave.map[next].time){
                        // Update time and push new position to queue
                        cave.map[next].time = newTime;

                        // f value is priority
                        f = cost + newTime + next.distance(target);
                        f = Number.MAX_SAFE_INTEGER - f;

                        // Add new state to queue
                        queue.enqueue([next, current, newTime], f);
                    }
                }
            });
        }
        // Return time to get to target
        return cave.map[target].time;
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