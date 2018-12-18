'use strict';

import fs from 'fs'
import Grid from './Classes'
 
const Solution = {
    solve: function(){
        const serial = Number(this.readFile());

        let sumTable = new Grid(300, 300, 0);
        const size = sumTable.getSize();
        let max = { x: 0, y: 0, total: 0, size: 0 };

        // Matrix --> Cartesian
        // i = y
        // j = x

        // Iterate over rows (y's)
        for(let i = 0; i < size.i; i++){
            // Get starting sum
            let sum = sumTable.at(i, 0);

            // Iterate over columns (x's)
            for(let j = 0; j < size.j; j++){
                // Get power of this position
                let power = this.getPower(j + 1, i + 1, serial);
                // Get sum up to this point
                if(j)
                    sum += sumTable.at(i - 1, j) - sumTable.at(i - 1, j - 1);
                sum += power;
                // Set power level at position
                sumTable.set(i, j, sum);
                
                // Check square 
                for(let square = 1; square <= i + 1; square++){
                    // This stops drawing for edge spaces early
                    if(square > j + 1)
                        break;
                    // Get partial sum for this square
                    let total = this.getPartialSum(sumTable, i, j, square, square);
                    if(total > max.total)
                        max = { x: j - square + 2, y: i - square + 2, total: total, size: square };
                }
            }
            // Copy row to next level down
            if(i != size.i - 1)
                sumTable.copyRow(i, i + 1);
        }
        return max;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    getPower(x, y, serial){
        let rackID = x + 10;
        let power = rackID * y;
        power += serial;
        power *= rackID;
        power = Math.floor((power % 1000) / 100);
        power -= 5;
        return power;
    },

    getPartialSum(sumTable, i, j, length = 1, height = 1){
        let total = 0;
        total += sumTable.at(i, j);
        
        let yOffset = i >= length;
        let xOffset  = j >= height;
        if(yOffset)
            total -= sumTable.at(i - length, j);
        if(xOffset)
            total -= sumTable.at(i, j - height);
        if(yOffset && xOffset)
            total += sumTable.at(i - length, j - height);
        return total;
    }
}

export default Solution;