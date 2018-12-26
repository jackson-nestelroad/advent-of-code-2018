'use strict';
import readline from 'readline'

export class Coordinate { 
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    // How coordinate is stored as a key in an object
    toString(){
        return `${this.x}x${this.y}`;
    }
}

export class Fighter {
    constructor(x, y, hp, ap, type, enemy){
        this.pos = new Coordinate(x, y);
        this.hp = hp;
        this.ap = ap;
        this.type = type;
        this.enemy = enemy;
    }

    // Hit an enemy
    attack(enemy){
        return enemy.hit(this.ap);
    }

    // Fighter is hit
    hit(ap){
        this.hp -= ap;
        if(this.hp <= 0)
            return 1;
        return 0;
    }

    // Move to a different coordinate
    move(coord){
        this.pos = coord;
    }
}

export class Map {
    constructor(array){
        this.array = array;
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Get tile at x,y point
    at(x, y){
        return this.array[y][x];
    }

    // Change the value of a tile
    fill(pos, char){
        this.array[pos.y][pos.x] = char;
        return char;
    }

    // Get array of adjacent coordinates
    adjacent(pos){
        return [
            new Coordinate(pos.x, pos.y - 1),
            new Coordinate(pos.x - 1, pos.y),
            new Coordinate(pos.x + 1, pos.y),
            new Coordinate(pos.x, pos.y + 1)
        ];
    }

    // Check if tile is solid at point
    isSolid(coord){
        return this.array[coord.y][coord.x] != '.';
    }

    // Swap two tiles
    swap(pos1, pos2){
        let temp = this.at(pos1.x, pos1.y);
        this.array[pos1.y][pos1.x] = this.at(pos2.x, pos2.y);
        this.array[pos2.y][pos2.x] = temp;
    }

    // Print out the game map
    print(round){
        if(round)
            readline.moveCursor(process.stdout, 0, -1 * (this.array.length + 1));
        this.terminal.write(`After Round ${round}:\n`);
        this.array.forEach(line => {
            this.terminal.write(`${line.join('')}\n`);
        });
    }
}

export class Game {
    constructor(map, problem = 'A', elfAP = 3){
        this.map = new Map(map);
        this.problem = problem;
        this.elfAP = elfAP;
        this.round = 0;
        this.over = false;
        this.elfDead = false;
        this.fighters = this.getFighters();
    }

    // Scan map and store all fighters
    getFighters(){
        let fighters = [];
        for(let y = 0; y < this.map.array.length; y++){
            for(let x = 0; x < this.map.array[y].length; x++){
                // Goblin found
                if(this.map.at(x,y) == 'G')
                    fighters.push(new Fighter(x, y, 200, 3, 'G', 'E'));
                // Elf found
                else if(this.map.at(x,y) == 'E')
                    fighters.push(new Fighter(x, y, 200, this.elfAP, 'E', 'G'));
            }
        }
        return fighters;
    }

    // Start the game
    start(){
        // this.map.print(this.round);
        while(true){
            // Run the round
            this.runRound();

            // Print out the game board
            // this.map.print(this.round);

            // Part B
            if(this.problem == 'B' && this.elfDead)
                return false;

            // The game is over
            if(this.over)
                break;
        }
        // Find out the winning score
        return this.getWinner();
    }

    // Run a round
    runRound(){
        // Sort fighters backwards based on reading order of position
        this.sortFighters();
        this.current = null;
        let i = this.fighters.length;
        // Iterate through fighters array backwards
        while(i--){
            if(this.current == this.fighters[i])
                continue;
            this.current = this.fighters[i];
            // Get possible targets
            this.targets = this.fighters.filter(f => f.type == this.current.enemy);

            // No targets left, so game is over
            if(this.targets.length == 0){
                this.over = true;
                return;
            }

            // Attack any adjacent targets if possible
            if(this.attack())
                continue;

            // Move towards the closest target
            this.move();
        
            // Attack if possible
            this.attack();
        }
        this.round++;
    }

    // Move towards closest target
    move(){
        const path = this.path();
        if(path){
            this.map.swap(this.current.pos, path[1]);
            this.current.move(path[1]);
        }
    }

    // Build path to closest target
    path(){
        // Get enemies with open adjacent tiles (accessible by the current fighter)
        this.targets = this.targets.filter(target => this.map.adjacent(target.pos).some(coord => !this.map.isSolid(coord)))
            .sort((a, b) => {
                let y = a.pos.y - b.pos.y;
                return y ? y : a.pos.x - b.pos.x;
            });

        // Tiles that have already been visited
        let visited = { };
        visited[this.current.pos] = true;

        // Store current path and targets to aim for
        let paths = [[this.current.pos]];
        let targets = { };
        this.targets.forEach(target => targets[target.pos] = true);

        // Infinite loop that runs until we get a path
        while(true){
            let newPaths = [];
            let targetPaths = [];
            // Navigate farther along each path 
            paths.forEach(path => {
                // Check all adjacent tiles to each path stored
                this.map.adjacent(path[path.length - 1]).forEach(adj => {
                    // We have found an enemy!
                    if(targets[adj])
                        targetPaths.push([...path, adj]);
                    // We are at a new location, so save this path for the next iteration
                    else if(!visited[adj] && !this.map.isSolid(adj)){
                        newPaths.push([...path, adj]);
                        visited[adj] = true;
                    }
                });
            });
            // We have found a path to an enemy
            if(targetPaths.length){
                // If multiple paths, sort by reading order of FIRST move (NOT THE TARGET'S POSITION)
                targetPaths.sort((a, b) => {
                    let y = a[1].y - b[1].y;
                    return y ? y : a[1].x - b[1].x;
                });
                // Return the first path to the enemy found
                return targetPaths[0];
            }

            // Save new paths
            paths = newPaths;
            // No new paths, so there is no enemy to move towards
            if(paths.length == 0){
                return false;
            }
        }
    }

    // Attack an adjacent target if there is one
    attack(){
        // Check all adjacent tiles for an enemy
        let potentials = this.map.adjacent(this.current.pos)
            .filter(coord => this.map.at(coord.x, coord.y) == this.current.enemy)
            .map(coord => this.targets.find(target => target.pos.x == coord.x && target.pos.y == coord.y));
        // No one to hit!
        if(potentials.length == 0)
            return false;

        // Attack the target with the lowest hp
        potentials.sort((a, b) => {
            let diff = a.hp - b.hp;
            if(diff)
                return diff;
            let y = a.pos.y - b.pos.y;
            return y ? y : a.pos.x - b.pos.x;
        });
        let enemy = potentials[0];

        // Returns true if enemy dies
        if(this.current.attack(enemy)){
            // Remove them from the game and the map
            if(enemy.type == 'E')
                this.elfDead = true;
            this.fighters = this.fighters.filter(f => f != enemy);
            this.map.fill(enemy.pos, '.');
        }
        return true;
    }

    // Sort backwards based on reading order of position
    sortFighters(){
        this.fighters.sort((a, b) => {
            let y = b.pos.y - a.pos.y;
            return y ? y : b.pos.x - a.pos.x;
        });
    }

    // Get winning score
    getWinner(){
        let totalHP = 0;
        // Sum all HP
        for(let fighter of this.fighters){
            totalHP += fighter.hp;
        }
        // Multiply by number of rounds completed
        return totalHP * this.round;
    }
}