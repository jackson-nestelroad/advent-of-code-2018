'use strict';

export class Coordinate {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    toString(){
        return `${this.x}x${this.y}`;
    }

    left(x = 1){
        return new Coordinate(this.x - x, this.y);
    }

    right(x = 1){
        return new Coordinate(this.x + x, this.y);
    }

    down(y = 1){
        return new Coordinate(this.x, this.y + 1);
    }
}

export const Tiles = {
    CLAY: '#',
    SAND: undefined,
    STREAM: '|',
    WATER: '~'
}