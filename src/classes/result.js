'use strict';

export default class Result {
    constructor(result, time){
        this.result = result;
        this.time = time;
    }

    getJSON(){
        return {
            result: this.result,
            time: `${this.time}ms`
        }
    }
}