'use strict';

import fs from 'fs'
import { Coordinate as Star } from './Classes';

const Solution = {
    solve: function(file = "input.txt"){
        // Read file for input 
        let input = this.readFile(file).split('\n').slice(0, -1).map(s => this.parseNumbers(s));

        // Create stars from input
        let stars = input.map(a => new Star(...a));

        // Link the stars together as constellations
        let lookAt;
        for(let i = 0; i < stars.length; i++){
            lookAt = stars.slice(i + 1);
            for(let star of lookAt){
                if(stars[i].distance(star) <= 3){
                    stars[i].connected.add(star);
                    star.connected.add(stars[i]);
                }
            }
        }

        // Get number of constellations
        return this.numConstellations(stars);
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },
    
    parseNumbers: function(string){
        return string.match(/[+-]?\d+(?:\.\d+)?/g).map(n => Number(n));
    },

    // Get number of constellations
    numConstellations: function(stars){
        let count = 0;
        // Stars we have already considered
        let seen = new Set();
        for(let star of stars){
            // We have not considered this star, it is a start of a new constellation!
            if(!seen.has(star)){
                count++;
                seen.add(star);
                this.checkConstellation(star, seen);
            }
        }
        return count;
    },

    // Run through a star's connected stars
    checkConstellation: function(star, seen = new Set()){
        // We are connected to at least one another star
        if(star.connected.size){
            let next;
            let iterator = star.connected.values();
            // Iterate through the connected stars
            while(next = iterator.next().value){
                if(!seen.has(next)){
                    seen.add(next);
                    // Recurse down through the constellation
                    this.checkConstellation(next, seen);
                }
            }
        }
    }
}

export default Solution;