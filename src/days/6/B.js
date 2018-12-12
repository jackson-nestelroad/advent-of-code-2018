'use strict';

import fs from 'fs'
import { Point } from './Classes'
import Algorithms from '../../classes/Algorithms'
 
const Solution = {
    solve: function(){
        // Get input
        let input = this.readFile().split('\n');
        input.splice(-1);

        // Parse all points and get ranges
        let X = { min: Infinity, max: 0 };
        let Y = { min: Infinity, max: 0 };
        let Points = input.map(point => {
            point = point.split(', ').map(x => Number(x));
            point = new Point(point);
            if(point.x > X.max)
                X.max = point.x;
            else if(point.x < X.min)
                X.min = point.x;
            if(point.y > Y.max)
                Y.max = point.y;
            else if(point.y < Y.min)
                Y.min = point.y;
            return point;
        });

        // Get number of safe points
        let safePoints = 0;
        Algorithms.range(X.min, X.max).forEach(x => {
            Algorithms.range(Y.min, Y.max).forEach(y => {
                let distances = Points.map(point => point.distance(x,y));
                let sum = distances.reduce((a,b) => a + b, 0);
                if(sum < 10000)
                    safePoints++;
            });
        });
        return safePoints;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    }
}

export default Solution;