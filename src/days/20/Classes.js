export default class Coordinate {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    north(){
        this.y++;
    }

    east(){
        this.x++;
    }

    west(){
        this.x--;
    }

    south(){
        this.y--;
    }

    toString(){
        return `${this.x}x${this.y}`;
    }
}