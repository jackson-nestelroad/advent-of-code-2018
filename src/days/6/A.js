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

        // Get the closest point to all points
        let closestPoint = { };
        Algorithms.range(X.min, X.max).forEach(x => {
            Algorithms.range(Y.min, Y.max).forEach(y => {
                let distances = Points.map(point => point.distance(x, y));
                let shortest = Math.min(...distances);
                if(distances.filter(distance => distance == shortest).length == 1)
                    closestPoint[new Point(x,y)] = distances.indexOf(shortest);
            });
        });

        // Move around the edges and ignore the closest points to the edges
        let ignorePoint = { };
        Algorithms.range(X.min, X.max).forEach(x => {
            ignorePoint[Points[closestPoint[new Point(x, Y.min)]]] = true;
            ignorePoint[Points[closestPoint[new Point(x, Y.max)]]] = true;
        });
        Algorithms.range(Y.min, Y.max).forEach(y => {
            ignorePoint[Points[closestPoint[new Point(X.min, y)]]] = true;
            ignorePoint[Points[closestPoint[new Point(X.max, y)]]] = true;
        });

        // Get the area (# of closest points) for each point we are not ignoring
        let areas = { };
        Algorithms.range(X.min, X.max).forEach(x => {
            Algorithms.range(Y.min, Y.max).forEach(y => {
                let point = new Point(x,y);
                let closest = closestPoint[point];
                if(!ignorePoint[point])
                    areas[closest] = areas[closest] ? areas[closest] + 1 : 1;
            });
        });

        return Math.max(...Object.entries(areas).map(entry => entry[1]));
        
        // Create a 2D array for all points with their closest point
        // let closestPoint = Array(X.max + 1).fill().map((value, key) => Array(Y.max + 1));
        // Algorithms.range(X.min, X.max).forEach(x => {
        //     Algorithms.range(Y.min, Y.max).forEach(y => {
        //         let distances = Points.map(point => point.distance(x, y));
        //         let shortest = Math.min(...distances);
        //         if(distances.filter(distance => distance == shortest).length == 1)
        //             closestPoint[x][y] = distances.indexOf(shortest);
        //     });
        // });
        // return true;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    }
}

export default Solution;