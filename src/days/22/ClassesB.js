'use strict';

// Coordinate class changed to State class that also records tool at position
export class State {
    constructor(x, y, t = 0){
        this.x = x;
        this.y = y;
        this.t = t;
    }

    toString(){
        return `${this.x}x${this.y}x${this.t}`;
    }

    adjacent(){
        return [
            new State(this.x, this.y - 1, this.t),
            new State(this.x - 1, this.y, this.t),
            new State(this.x + 1, this.y, this.t),
            new State(this.x, this.y + 1, this.t),
            new State(this.x, this.y, (this.t + 1) % 3),
            new State(this.x, this.y, (this.t + 2) % 3)
        ];
    }

    distance(coord){
        return Math.abs(this.y - coord.y) + Math.abs(this.x - coord.x);
    }

    shiftTool(){
        return this.t = (this.t + 1) % 3;
    }
}

export class Region {
    constructor(index, erosion, type){
        this.index = index;
        this.erosion = erosion;
        this.type = type;
        this.time = Infinity;
    }

    copy(){
        return new Region(this.index, this.erosion, this.type);
    }
}

export const Tools = {
    NEITHER: 0,
    TORCH: 1,
    GEAR: 2
}

export class Cave {
    constructor(x, y, depth, target){
        this.depth = depth;
        this.target = target;
        this.map = { };
        this.indeces = { };
        this.createMap(x, y);
    }

    createMap(X, Y){
        let coord;
        let region;
        for(let x = 0; x <= X; x++){
            for(let y = 0; y <= Y; y++){
                coord = new State(x, y);
                region = this.createRegion(coord);
                this.indeces[`${coord.x}x${coord.y}`] = region.index;
                coord.t = region.type;
                for(let k = 0; k < 2; k++){
                    coord.shiftTool();
                    this.map[coord] = k ? region.copy() : region;
                }
            }
        }
    }

    createRegion(coord){
        let index = this.getGeologicIndex(coord);
        let erosion = this.getErosionLevel(index);
        let type = this.getType(erosion);
        return new Region(index, erosion, type);
    }

    getGeologicIndex(coord){
        if(this.indeces[`${coord.x}x${coord.y}`])
            return this.indeces[`${coord.x}x${coord.y}`];

        if(coord.x == 0 && coord.y == 0)
            return 0;
        if(coord.x == this.target.x && coord.y == this.target.y)
            return 0;
        if(coord.y == 0)
            return coord.x * 16807;
        if(coord.x == 0)
            return coord.y * 48271;

        let adjacents = coord.adjacent().slice(0, 2);
        adjacents = adjacents.map(coord => this.getGeologicIndex(coord));
        adjacents = adjacents.map(index => this.getErosionLevel(index));
        return adjacents[0] * adjacents[1];
    }

    getErosionLevel(index){
        return (index + this.depth) % 20183;
    }

    getType(erosion){
        return erosion % 3;
    }
}

