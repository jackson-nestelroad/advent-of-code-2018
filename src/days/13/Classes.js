'use strict';

export default class Cart {
    constructor(x, y, dir, below){
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.below = below;
        this.turnChoice = 0;
    }

    move(){
        // Move forward in direction
        if(this.dir == '^')
            this.y--;
        else if(this.dir == '>')
            this.x++;
        else if(this.dir == 'v')
            this.y++;
        else if(this.dir == '<')
            this.x--;
    }

    makeTurn(){
        // Turn if needed
        if(this.below == '/'){
            if(this.dir == '^')
                this.turn(2);
            else if(this.dir == '>')
                this.turn(0);
            else if(this.dir == 'v')
                this.turn(2);
            else if(this.dir == '<')
                this.turn(0);
        }
        else if(this.below == '\\'){
            if(this.dir == '^')
                this.turn(0);
            else if(this.dir == '>')
                this.turn(2);
            else if(this.dir == 'v')
                this.turn(0);
            else if(this.dir == '<')
                this.turn(2);
        }
        // Have the option to turn
        else if(this.below == '+'){
            this.turn(this.turnChoice++ % 3);
        }
    }

    turn(dir){
        // Turn left
        if(dir == 0){
            if(this.dir == '^')
                this.dir = '<';
            else if(this.dir == '<')
                this.dir = 'v';
            else if(this.dir == 'v')
                this.dir = '>';
            else if(this.dir == '>')
                this.dir = '^';
        }
        // Turn right
        else if(dir == 2){
            if(this.dir == '^')
                this.dir = '>';
            else if(this.dir == '>')
                this.dir = 'v';
            else if(this.dir == 'v')
                this.dir = '<';
            else if(this.dir == '<')
                this.dir = '^';
        }
        // Move straight
        else{
            return;
        }
    }
}