'use strict';

export class Rectangle {
    constructor(coordinate, length, height){
        this.coordinate = coordinate;
        this.length = Number(length);
        this.height = Number(height);
    }
}

export class Coordinate {
    constructor(x, y){
        this.x = Number(x);
        this.y = Number(y);
    }

    toString(){
        return this.x + 'x' + this.y;
    }
}