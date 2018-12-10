'use strict';

import fs from 'fs'
import { Rectangle, Coordinate } from './Classes'
 
const Solution = {
    solve: function(){
        let input = this.readFile().split('\n');
        let rectangles = [];
        input.forEach(rectangle => {
            let parsedRectangle = this.parseRectangle(rectangle);
            if(parsedRectangle)
                rectangles.push(parsedRectangle);
        });

        let coords = { };
        let overlap = { };

        return this.getOverlapCount(rectangles);
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

    getOverlapCount: function(rectangles){
        let coords = { };
        let overlap = { };
        rectangles.forEach(rectangle => {
            let xbeginning = rectangle.coordinate.x;
            let xend = xbeginning + rectangle.length;
            let ybeginning = rectangle.coordinate.y;
            let yend = ybeginning + rectangle.height;

            for(let x = xbeginning; x < xend; x++){
                for(let y = ybeginning; y < yend; y++){
                    let coordString = (new Coordinate(x, y)).toString();
                    if(coords[coordString])
                        overlap[coordString] = true;
                    else
                        coords[coordString] = true;
                }
            }
        });

        return Object.keys(overlap).length;
    }
}

export default Solution;