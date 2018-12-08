'use strict';

import fs from 'fs';

const Solution = {
    solve: function(){
        let codes = this.readFile().split('\n');
        let doubles = 0;
        let triples = 0;
        codes.forEach(code => {
            let result = this.checkCode(code);
            if(result & 2)
                doubles++;
            if(result & 4)
                triples++;
        });

        return doubles * triples;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    checkCode: function(code){
        let codeArray = code.split('');
        let instances = { };
        codeArray.forEach(char => {
            if(!instances[char])
                instances[char] = 1;
            else
                instances[char]++;
        })

        let result = 1;
        Object.keys(instances).forEach(char => {
            result |= (2 ** (instances[char] - 1));
        })

        return result;
    }

}

export default Solution;