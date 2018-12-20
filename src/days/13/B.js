'use strict';

import fs from 'fs'
import Cart from './Classes'
 
const Solution = {
    solve: function(){
        let tracks = this.readFile().split('\n').map(line => line.split(''));
        tracks = tracks.slice(0, tracks.length - 1);
    
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

        // Recursive function exceeds maxmimum call stack size :(
        // let crash = this.lastCartStanding(tracks, carts);

        // While there is more than one cart left
        while(carts.length != 1){
            // Sort the cars in reverse order!
            carts = this.sortCarts(carts);
            let i = carts.length;
            let cart;
            // Iterate through carts array backwards
            // We iterate backwards so when we remove carts, our indexes aren't totally shifted
            while(i--){
                cart = carts[i];
                tracks[cart.y][cart.x] = cart.below;
                cart.move();
                cart.below = tracks[cart.y][cart.x];
                cart.makeTurn();

                // Crash occurred, remove the carts
                if(['^', '>', 'v', '<'].includes(cart.below)){
                    let hit = carts.find(element => {
                        return element.x == cart.x && element.y == cart.y && !['^', '>', 'v', '<'].includes(element.below);
                    });
                    tracks[cart.y][cart.x] = hit.below;
                    carts = carts.filter(element => element.x != cart.x || element.y != cart.y);
                    // If index is out of bounds, move it back
                    if(i > carts.length)
                        i = carts.length;
                }
                else{
                    tracks[cart.y][cart.x] = cart.dir;
                }
            }
        }
        // Return the last cart standing
        return carts[0];
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    // Reverse order from part A!
    sortCarts: function(carts){
        return carts.sort((a,b) => {
            let y = b.y - a.y;
            return y ? y : b.x - a.x;
        });
    }
}

export default Solution;