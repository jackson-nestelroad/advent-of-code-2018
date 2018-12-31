'use strict';

import fs from 'fs'

const Solution = {
    solve: function(file = "input.txt"){
        let regex = this.readFile(file).slice(1, -2);
        regex = this.replaceLoops(regex);
        return this.getLongestPath(regex).max;
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    replaceLoops(regex){
        // Remove unnecessary loops entirely
        return regex.replace(/(\()[NEWS]*(\|\))/g, '');
    },

    // This function traverses down and returns the longest path at each level,
    // eventually creating the longest path ever
    getLongestPath(regex){
        let paths = [0];
        let current = 0;
        let i = -1;
        while(++i < regex.length){
            if(regex[i] == '|')
                paths[++current] = 0;
            else if(regex[i] == '('){
                let inner = this.getLongestPath(regex.substring(i + 1));
                paths[current] += inner.max;
                i += inner.end;
            }
            else if(regex[i] == ')'){
                break;
            }
            else
                paths[current]++;
        }
        return {
            end: i + 1,
            max: Math.max(...paths)
        }
    }
}

export default Solution;