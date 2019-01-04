'use strict';

export class Nanobot {
    constructor(x, y, z, radius){
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
    }

    distance(nanobot){
        return  Math.abs(this.x - nanobot.x) + 
                Math.abs(this.y - nanobot.y) + 
                Math.abs(this.z - nanobot.z);
    }

    inRange(nanobot){
        return this.distance(nanobot) <= this.radius;
    }
}