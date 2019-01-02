'use strict';

export class Coordinate {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    toString(){
        return `${this.x}x${this.y}`;
    }
}

export class Region {
    constructor(index, erosion, type){
        this.index = index;
        this.erosion = erosion;
        this.type = type;
    }
}

export class Cave {
    constructor(x, y, depth, target){
        this.depth = depth;
        this.target = target;
        this.map = { };
        this.createMap(x, y);
    }

    createMap(X, Y){
        let coord;
        for(let x = 0; x <= X; x++){
            for(let y = 0; y <= Y; y++){
                coord = new Coordinate(x, y);
                this.map[coord] = this.createRegion(coord);
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
        if(this.map[coord])
            return this.map[coord].index;

        if(coord.x == 0 && coord.y == 0)
            return 0;
        if(coord.x == this.target.x && coord.y == this.target.y)
            return 0;
        if(coord.y == 0)
            return coord.x * 16807;
        if(coord.x == 0)
            return coord.y * 48271;

        let adjacents = this.getAdjacents(coord).slice(0, 2);
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

    getAdjacents(coord){
        return [
            new Coordinate(coord.x, coord.y - 1),
            new Coordinate(coord.x - 1, coord.y),
            new Coordinate(coord.x + 1, coord.y),
            new Coordinate(coord.x, coord.y + 1)
        ];
    }
}

