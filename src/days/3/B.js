'use strict';

import fs from 'fs'
import { Rectangle, Coordinate } from './Classes'
 
const Solution = {
    solve: function(){
        let input = this.readFile().split('\n');
        let rectanglesByX = [];
        input.forEach(rectangle => {
            let parsedRectangle = this.parseRectangle(rectangle);
            if(parsedRectangle){
                if(this.insertByCoordinate(rectanglesByX, parsedRectangle, 'x') == -1)
                    throw "Failed to insert into rectanglesByX array.";
            }
        });

        let k = 0;
        let i = 0;
        let noOverlap = [];
        for(k = 0; k < rectanglesByX.length; k++){
            for(i = 0; i < rectanglesByX.length; i++){
                if(i == k)
                    continue;
                let overlapping = rectanglesByX[k].isOverlapping(rectanglesByX[i]);
                if(overlapping)
                    break;
            }
            // console.log("Not " + rectanglesByX[k].id + ". Checked " + Math.abs(i - k) + " rectangles.");
            if(i == rectanglesByX.length){
                noOverlap.push(rectanglesByX[k].id);
            }
        }
        return noOverlap;
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    parseRectangle: function(rectangle){
        if(rectangle == '' || !rectangle)
            return false;
        let id = Number(rectangle.substring(1, rectangle.search('@') - 1));
        rectangle = rectangle.substring(rectangle.search('@') + 2);
        let array = rectangle.split(': ');
        let coordinate = array[0].split(',');
        let size = array[1].split('x');

        let coordinateObject = new Coordinate(coordinate[0], coordinate[1]);
        return new Rectangle(id, coordinateObject, size[0], size[1]);
    },

    insertByCoordinate: function(array, rectangle, coord){
        if(coord.toLowerCase() != 'x' && coord.toLowerCase() != 'y')
            return -1;
        let first = 0;
        let last = array.length;
        while(last > first && rectangle.coordinate[coord] < array[last - 1].coordinate[coord]){
            array[last] = array[last - 1];
            last--;
        }
        array[last] = rectangle;
        return last;
    }
}

export default Solution;