'use strict';

import fs from 'fs'
 
const Solution = {
    solve: function(){
        let input = this.readFile().split('\n');

        // Get initial state
        let initial = input.slice(0,1).join();
        initial = initial.substring(initial.indexOf(': ') + 2);
        initial = this.plantsToBits(initial);
        initial = "00" + initial;

        // Get rules as binary numbers
        let rules =  input.slice(2, input.length - 1);
        rules = this.parseRules(rules);
        let state = initial;
        
        // Run each generation
        for(let gen = 1; gen <= 110; gen++){
            // Extend state to the right by two pots as we grow to the left
            state = this.extendState(state);
            let newState = "";
            // Check each pot and the two around it
            for(let pot = 0; pot < state.length; pot++){
                let pattern = "";
                let beginning = pot - 2;
                let end = pot + 2;
                // Create five pot pattern
                if(beginning < 0){
                    pattern += "0".repeat(2 - pot);
                    pattern += state.substring(0, end + 1);
                }
                else if(end >= state.length){
                    pattern += state.substring(beginning);
                    pattern += "0".repeat(5 - pattern.length);
                    //console.log(gen, pot, pattern, parseInt(pattern, 2), this.testPattern(parseInt(pattern, 2), rules));
                }
                else{
                    pattern += state.substring(beginning, end + 1);
                }

                // Test pattern to see if it will produce a plant
                let plant = this.testPattern(parseInt(pattern, 2), rules);
                if(plant)
                    newState += "1";
                else
                    newState += "0";
            }
            // Find where the plants stop changing
            if(this.trim(newState) == this.trim(state)){
                state = newState;
                let firstPot = state.indexOf("1");

                // Count up the pot IDs
                let count = 0;
                for(let pot = firstPot; pot < state.length; pot++){
                    if(state[pot] == "1"){
                        count += pot + 5e10 - gen - 2;
                    }
                }
                return count;
            }
            state = newState;
        }
        return false;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    parseRules: function(array){
        let rules = [];
        array.forEach(rule => {
            if(rule[rule.length - 1] == '#'){
                let bits = parseInt(this.plantsToBits(rule.slice(0,5)), 2);
                rules.push(bits);
            }
        });
        return rules;
    },

    plantsToBits: function(string){
        return string.replace(/\#/g, '1').replace(/\./g, '0');
    },

    testPattern: function(bits, rules){
        return rules.includes(bits);
    },

    extendState: function(string, spaces = 2){
        if(string.substring(string.length - 2) == "00")
            return string;
        return string + "0".repeat(spaces);
    },

    trim: function(string){
        var reg = /^0+|0+$/g;
        return string.replace(reg, '');
    }
}

export default Solution;