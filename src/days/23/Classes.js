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

export class Coordinate {
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    distance(coord){
        return  Math.abs(this.x - coord.x) + 
                Math.abs(this.y - coord.y) + 
                Math.abs(this.z - coord.z);
    }
}

export class Cube {
    constructor(center, size, bots){
        this.center = center;
        this.size = size;
        this.bots = bots;
    }

    // Create points to search in the cube
    createPoints(samples = 3){
        let points = [this.center];

        let half = Math.floor(this.size / 2);
        half = half ? half : 1;

        let step = Math.floor(this.size / samples);
        step = step ? step : 1;

        // Get range of points
        let X = { min: this.center.x - half, max: this.center.x + half };
        let Y = { min: this.center.y - half, max: this.center.y + half };
        let Z = { min: this.center.z - half, max: this.center.z + half };

        // Create all the points
        for(let x = X.min; x <= X.max; x += step){
            for(let y = Y.min; y <= Y.max; y += step){
                for(let z = Z.min; z <= Z.max; z += step){
                    points.push(new Coordinate(x, y, z));
                }
            }
        }

        return points;
    }
}