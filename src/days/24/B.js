'use strict';

import fs from 'fs'
import { Group } from './Classes'

const Solution = {
    solve: function(file = "input.txt"){
        // Get input as strings
        let returnChar = file == "sample.txt" ? "\r\n" : "\n";
        let input = this.readFile(file).split(`\n${returnChar}`).map(x => x.split(returnChar).slice(1));
        input[1] = input[1].slice(0, -1);

        // Binary search for lowest boost for the immune system to win
        let boost = 0;
        let step = 2 ** 10;
        let win;
        while(true){
            boost += step;
            // Create the groups from the input
            this.createGroups(input, boost);

            // Run the fight with the immune system boost
            win = this.fight();

            // Immune system won the fight!
            if(win){
                // Step size is 1, we have found the minimum
                if(step == 1)
                    break;

                // Undo what we just did and use a smaller step size
                boost -= step;
                step /= 2;
            }
        }

        // Return the winning team's units
        return this.groups.reduce((sum, a) => sum += a.remaining, 0);
    },

    readFile: function(file){
        return fs.readFileSync(`${__dirname}/${file}`, 'utf8');
    },

    state: function(){
        return this.groups.reduce((sum, a) => sum += a.remaining, 0);
    },

    // Check if fight is over
    over: function(){
        let immuneUnits = this.groups.filter(g => g.system == "immune").reduce((sum, a) => sum += a.remaining, 0);
        return !immuneUnits ? true : !this.groups.filter(g => g.system == "infection").reduce((sum, a) => sum += a.remaining, 0);
    },

    // Create the groups to fight
    createGroups: function(input, boost = 0){
        // Create the immune system
        let immunes = input[0].map(str => Group.fromString("immune", str, boost));

        // Create the infection
        let infections = input[1].map(str => Group.fromString("infection", str));
        
        // Merge them in one group
        this.groups = immunes.concat(infections);
    },

    // Fight to the death!
    fight: function(){
        let previousState;
        while(!this.over()){
            previousState = this.state();
            this.targetSelection();
            this.attack();
            // We have reached a stalemate, end the fight
            if(this.state() == previousState)
                return false;
        }
        return !this.groups.filter(g => g.remaining).some(g => g.system == "infection");
    },

    // Target selection phase
    targetSelection: function(){
        // Order groups by decreasing effective power, initiative
        // لُلُصّبُلُلصّبُررً ॣ ॣh ॣ ॣ
        // 冗
        let order = this.groups.filter(g => g.remaining != 0).sort((a, b) => {
            let powerDiff = b.effectivePower() - a.effectivePower();
            return powerDiff ? powerDiff : b.initiative - a.initiative;
        });

        // Get the target for each group in order
        let target;
        for(let group of order){
            // Get target by highest potential damage, power, initiative
            target = order.filter(g => g.system != group.system && g.targetedBy === null)
                .map(g => { return { group: g, damage: group.maxDamage(g) } })
                .sort((a, b) => {
                    let damageDiff = b.damage - a.damage;
                    if(!damageDiff){
                        let powerDiff = b.group.effectivePower() - a.group.effectivePower();
                        return powerDiff ? powerDiff : b.group.initiative - a.group.initiative;
                    }
                    return damageDiff;
                }) [0];
            // Target the target if we can hurt the target
            if(target && target.damage > 0){
                group.target = target.group;
                target.group.targetedBy = group;
            }
        }
    },

    // Attack phase
    attack: function(){
        // Order groups by decreasing initiative
        let order = this.groups.slice(0).filter(g => g.target !== null && g.remaining != 0).sort((a, b) => {
            return b.initiative - a.initiative;
        });

        // Let each group attack
        for(let group of order){
            group.attack();
            group.target.targetedBy = null;
            group.target = null;
        }
    }
}

export default Solution;