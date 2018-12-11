'use strict';

export class Log {
    constructor(time, action){
        this.time = time;
        this.action = action;
    }

    isShiftChange(){
        return this.action.startsWith("Guard")
    }

    getGuardID(){
        if(!this.isShiftChange())
            return false;
        return parseInt(this.action.substring(this.action.search('#') + 1));
    }
}