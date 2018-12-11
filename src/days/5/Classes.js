'use strict';

export class Polymer {
    constructor(value){
        this.value = value;
    }

    remove(unit){
        let singleLetter = new RegExp("^[a-z]$", "i");
        if(!singleLetter.test(unit))
            return this.value;
        let reduced = this.value.replace(new RegExp(`[${unit}]`, "gi"), "");
        return new Polymer(reduced);
    }

    react(){
        let index = 0;
        let polymer = this.value;
        while(index < polymer.length - 1){
            if(polymer[index].toLowerCase() == polymer[index + 1].toLowerCase() && polymer[index] != polymer[index + 1]){
                polymer = polymer.substring(0, index) + polymer.substring(index + 2);
                index = index ? index - 1 : index;
            }
            else{
                index++;
            }
        }
        return new Polymer(polymer);
    }
}