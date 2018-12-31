'use strict';

import fs from 'fs'
import Coordinate from './Classes'

const Solution = {
    solve: function(file = "input.txt"){
        // Get input
        let regex = this.readFile(file).slice(1, -2);
        // Replace loops in the regex
        regex = this.replaceLoops(regex);
        // Get all paths
        let allPaths = this.getPaths(regex).paths;
        // Get number of rooms with minimum distance of 1000 doors
        return this.getRoomsWithMinDistance(allPaths[0], 1000);
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    replaceLoops(regex){
        // Replace loops with half of their rooms
        let test = /(\()[NEWS]*(\|\))/g;
        let match;
        let size;
        while(match = test.exec(regex)){
            size = match[0].slice(1, -2).length;
            regex = regex.substring(0, match.index) + match[0].slice(0, size / 2 + 1) + ')' +  regex.substring(match.index + size + 3);
        }
        return regex;
    },

    visited: { },

    // Originally this code did not use Coordinates to keep track of position,
    // but I learned that the example cases overlooked the possibility of repeating
    // various positions in the facility. Thus, I had to create a simple system
    // to keep track of where we are so I did not have to rework my entire code.
    getPaths(regex, point = new Coordinate(0,0)){
        // Paths will be a multi-dimension array that basically 
        // substitutes the parenthesis in the regex
        // We can traverse down any path this way
        let paths = [[0]];
        let i = 0;
        let j = 0;
        let char = -1;

        // Keeps track of where we are
        let location = new Coordinate(point.x, point.y);
        this.visited[location] = true;

        // Navigate through the regex
        while(++char < regex.length){
            // New path
            if(regex[char] == '|'){
                paths[++i] = [0];
                j = 0;
                location = new Coordinate(point.x, point.y);
            }
            // Another layer found, recurse down
            else if(regex[char] == '('){
                let inner = this.getPaths(regex.substring(char + 1), location);
                // Offset what character we are looking at to avoid infinite recursion
                char += inner.end;
                // Group the inner paths with the outer path
                paths[i][++j] = inner.paths;
                // True if the path doesn't need to traverse down into deeper layers
                // Example: EESS(WNSE|)SSS
                if(regex[char + 1] && regex[char + 1] != '|' && regex[char + 1] != ')'){    
                    paths[i][++j] = 0;
                }
            }
            // Layer ends
            else if(regex[char] == ')'){
                break;
            }
            // Add to the path
            else{
                // Move our location
                switch(regex[char]){
                    case 'N': location.north(); break;
                    case 'S': location.south(); break;
                    case 'E': location.east(); break;
                    case 'W': location.west(); break;
                }
                // We have not been here before, count it
                if(!this.visited[location]){
                    this.visited[location] = true;
                    paths[i][j]++;
                }
            }
        }
        // Return where we ended and the paths created
        return {
            end: char + 1,
            paths: paths
        }
    },

    getRoomsWithMinDistance: function(array, min, dist = 0){
        let count = 0;
        for(let i = 0; i < array.length; i++){
            // Deeper layer, recurse down
            if(array[i].constructor === Array)
                count += this.getRoomsWithMinDistance(array[i], min, dist);
            // Add to the distance we have traveled on the current path
            else{
                // Increase the count of rooms if we have reached our minimum distance
                if(dist >= min)
                    count += array[i];
                else if(dist + array[i] >= min)
                    count += (dist + array[i]) - min + 1;
                dist += array[i];
            }
        }
        return count;
    }
}

export default Solution;