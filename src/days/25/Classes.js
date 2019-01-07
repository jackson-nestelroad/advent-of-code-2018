'use strict';

export class Coordinate {
    constructor(x, y, z, t){
        this.x = x;
        this.y = y;
        this.z = z;
        this.t = t;
        this.connected = new Set();
    }

    toString(){
        return `${this.x}x${this.y}x${this.z}x${this.t}`;
    }

    distance(coord){
        return  Math.abs(this.x - coord.x) + 
                Math.abs(this.y - coord.y) + 
                Math.abs(this.z - coord.z) + 
                Math.abs(this.t - coord.t);
    }

    connect(coord){
        this.connected.add(coord);
        return true;
    }
}