'use strict';

export class Group {
    constructor(system, units, hp, immune, weak, ap, type, initiative){
        this.system = system;
        this.units = units;
        this.remaining = units;
        this.hp = hp;
        this.immune = immune;
        this.weak = weak;
        this.ap = ap;
        this.type = type;
        this.initiative = initiative;
        this.target = null;
        this.targetedBy = null;
    }

    attack(){
        if(this.target === null)
            throw "Group has no target to attack.";

        let killed = Math.floor(this.maxDamage(this.target) / this.target.hp);
        if(killed > this.target.remaining)
            this.target.remaining = 0;
        else
            this.target.remaining -= killed;
        return killed;
    }

    effectivePower(){
        return this.remaining * this.ap;
    }

    maxDamage(group){
        let multiplier = 1;
        if(group.weak.includes(this.type))
            multiplier = 2;
        else if(group.immune.includes(this.type))
            multiplier = 0;
        return this.remaining * this.ap * multiplier;
    }

    static fromString(system, string, boost = 0){
        let words = string.split(' ');

        // Data to collect
        let units;
        let hp;
        let immune = [];
        let weak = [];
        let ap;
        let type;
        let initiative;
        
        // A few helper functions
        const isNumber = str => str.match(/[+-]?\d+(?:\.\d+)?/g) !== null;
        const removePunc = str => str.replace(/[;\,]/g, '');

        // Run through the string
        let current;
        while(current = words.shift()){
            // We have number data, just collect it in order of appearance
            if(isNumber(current)){
                if(!units)
                    units = Number(current);
                else if(!hp)
                    hp = Number(current);
                else if(!ap){
                    ap = Number(current) + boost;
                    type = words.shift();
                }
                else if(!initiative)
                    initiative = Number(current);
            }
            // We have weaknesses and/or immunities
            else if(current.startsWith('(')){
                current = current.slice(1);
                let end = words.findIndex(str => str.endsWith(')'));
                words[end] = words[end].slice(0, -1);
                let parenthesis = [].concat(current, ...words.slice(0, end + 1)).map(s => removePunc(s));
                
                while(current = parenthesis.shift()){
                    if(current == "immune"){
                        parenthesis.shift();
                        while((current = parenthesis[0]) && current != "weak")
                            immune.push(parenthesis.shift());
                    }
                    else if(current == "weak"){
                        parenthesis.shift();
                        while((current = parenthesis[0]) && current != "immune")
                            weak.push(parenthesis.shift());
                    }
                }
            }    
        }

        return new Group(
            system,
            units,
            hp,
            immune,
            weak,
            ap,
            type,
            initiative
        );
    }
}