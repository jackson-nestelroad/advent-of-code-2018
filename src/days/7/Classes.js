'use strict';

export class Instruction { 

    constructor(letter){
        this.id = letter;
        this.before = [];
        this.after = [];
        this.done = false;
        this.working = false;
        this.started = undefined;
        this.time = Instruction.getTime(letter);
    }

    static getTime(letter){
        return (letter.charCodeAt(0) - 4);
    }

    toString(){
        return this.id;
    }

    isDone(){
        return this.done;
    }

    isWorking(){
        return this.working;
    }

    duration(){
        return this.time;
    }

    open(){
        return !this.done && (this.working === false);
    }

    started(){
        return this.started;
    }

    startWorking(worker, start){
        this.working = worker;
        this.started = start;
    }

    finish(){
        this.working = false;
        this.done = true;
    }
}