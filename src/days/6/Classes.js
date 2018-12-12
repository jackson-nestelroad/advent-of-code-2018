'use strict';

export class Point {
    constructor(x, y){
        if(!x){
            this.x = 0;
            this.y = 0;
        }
        else if(Array.isArray(x)){
            this.x = x[0];
            this.y = x[1];
        }
        else{
            this.x = x;
            this.y = y;
        }
    }

    distance(x, y){
        if(typeof(x) === 'object')
            return Math.abs(x.x - this.x) + Math.abs(x.y - this.y);
        else
            return Math.abs(this.x - x) + Math.abs(this.y - y);
    }

    toString(){
        return this.x + "x" + this.y;
    }
}