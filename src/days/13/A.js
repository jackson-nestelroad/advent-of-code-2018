'use strict';

import fs from 'fs'
import Cart from './Classes'
 
const Solution = {
    solve: function(){
        let tracks = this.readFile().split('\n').map(line => line.split('').slice(0, line.length - 1));
    
        // Get all the carts on the tracks
        const cartRegExp = /[\^v<>]/g;
        let carts = [];
        for(let y = 0; y < tracks.length; y++){
            let x;
            while(x = cartRegExp.exec(tracks[y].join(''))){
                let dir;
                let below;
                switch(tracks[y][x.index]){
                    case '^': 
                        dir = '^';
                        below = '|';
                        break;
                    case '>':
                        dir = '>';
                        below = '-';
                        break;
                    case 'v':
                        dir = 'v';
                        below = '|';
                        break;
                    case '<':
                        dir = '<'
                        below = '-';
                        break;
                }
                carts.push(new Cart(x.index, y, dir, below));
            }
        }
        let crash = this.findCrash(tracks, carts);
        return crash;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    sortCarts: function(carts){
        return carts.sort((a,b) => {
            let y = a.y - b.y;
            return y ? y : a.x - b.x;
        });
    },

    findCrash: function(tracks, carts){
        carts = this.sortCarts(carts);

        for(let cart of carts){
            tracks[cart.y][cart.x] = cart.below;
            cart.move();
            cart.below = tracks[cart.y][cart.x];
            cart.makeTurn();
            // Crash occurred
            if(['^', '>', 'v', '<'].includes(cart.below))
                return { x: cart.x, y: cart.y };
            tracks[cart.y][cart.x] = cart.dir;
        }
        return this.findCrash(tracks, carts);
    }
}

export default Solution;