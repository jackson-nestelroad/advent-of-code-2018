'use strict';

export class Rectangle {
    constructor(id, coordinate, length, height){
        this.id = Number(id);
        this.coordinate = coordinate;
        this.length = Number(length);
        this.height = Number(height);
    }
    

    isOverlapping(rectangle){
        let b = rectangle;

        let left = this.coordinate.x + this.length <= b.coordinate.x;
        let right = this.coordinate.x >= b.coordinate.x + b.length;
        let top = this.coordinate.y + this.height <= b.coordinate.y;
        let bottom = this.coordinate.y >= b.coordinate.y + b.height;
        
        let overlapping = !(left || right || top || bottom);
        return overlapping;
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