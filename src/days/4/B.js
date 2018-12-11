'use strict';

import fs from 'fs'
import { Log } from './Classes'
 
const Solution = {
    solve: function(){
        let input = this.readFile().split('\n');
        let guards = { };
        let logs = [];
        input.forEach(log => {
            let logObj = this.parseLog(log);
            if(logObj.isShiftChange()){
                let id = logObj.getGuardID();
                guards[id] = { };
            }
            this.insertByDate(logs, logObj);
        });

        let currentGuard;
        let mode = { guardID: 0, minute: 0, count: 0 };
        for(let k = 0; k < logs.length - 1; k++){
            if(logs[k].isShiftChange())
                currentGuard = logs[k].getGuardID();
            else{
                let start = logs[k++].time.getMinutes();
                let end = logs[k].time.getMinutes();

                for(let minute = start; minute < end; minute++){
                    guards[currentGuard][minute] = !guards[currentGuard][minute] ? 1 : guards[currentGuard][minute] + 1;
                    if(guards[currentGuard][minute] > mode.count)
                        mode = { guardID: currentGuard, minute: minute, count: guards[currentGuard][minute] };
                }
            }
        }

        return mode.guardID * mode.minute;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    insertByDate: function(array, log){
        let first = 0;
        let last = array.length;
        while(last > first && log.time < array[last - 1].time){
            array[last] = array[last - 1];
            last--;
        }
        array[last] = log;
        return last;
    },

    parseLog: function(string){
        let time = new Date(string.substring(1, string.search(']')));
        let action = string.substring(string.search(']') + 2);
        return new Log(time, action);
    }
}

export default Solution;