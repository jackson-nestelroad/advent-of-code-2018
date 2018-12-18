'use strict';

export default class Grid {
    constructor(I = 0, J = 0, value = 0){
        this.I = I;
        this.J = J;
        this.grid = new Array(this.I).fill(value).map(val => new Array(this.J).fill(value));
    }

    getSize(){
        return { i: this.I, j: this.J };
    }

    at(i = 0, j = 0){
        if(i < 0 || i >= this.I || j < 0 || j >= this.J)
            return 0;
        return this.grid[i][j];
    }

    set(i = 0, j = 0, value){
        try{
            this.grid[i][j] = value;
        }
        catch(error){
            return "Invalid coordinate.";
        }
    }

    copyRow(from, to){
        this.grid[to] = this.grid[from].slice();
        return;
    }
}