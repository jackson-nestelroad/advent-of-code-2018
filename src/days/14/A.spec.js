import { expect } from 'chai'
import Solution from './A'
import Scores from './Classes'

describe("Day 14 - Puzzle A", () => {
    describe("Solution", () => {
        it("should return 0124515891 after 5 recipes", () => {
            let recipes = 5;
            const outputLength = 10;
            let scores = new Scores();
            let elf1 = scores.addNode(3);
            let elf2 = scores.addNode(7);
    
            while(scores.getSize() < recipes + outputLength){
                let score = elf1.element + elf2.element;
                if(score < 10)
                    scores.add(score);
                else{
                    scores.add(Math.floor(score / 10));
                    scores.add(score % 10);
                }
                elf1 = scores.move(elf1.element + 1, elf1);
                elf2 = scores.move(elf2.element + 1, elf2);
            }
            let offset = -1 * (scores.getSize() - recipes);
            let start = scores.move(offset);
            expect(scores.printAsString(10, start)).to.equal("0124515891");
        });
        it("should return 9251071085 after 18 recipes", () => {
            let recipes = 18;
            const outputLength = 10;
            let scores = new Scores();
            let elf1 = scores.addNode(3);
            let elf2 = scores.addNode(7);
    
            while(scores.getSize() < recipes + outputLength){
                let score = elf1.element + elf2.element;
                if(score < 10)
                    scores.add(score);
                else{
                    scores.add(Math.floor(score / 10));
                    scores.add(score % 10);
                }
                elf1 = scores.move(elf1.element + 1, elf1);
                elf2 = scores.move(elf2.element + 1, elf2);
            }
            let offset = -1 * (scores.getSize() - recipes);
            let start = scores.move(offset);
            expect(scores.printAsString(10, start)).to.equal("9251071085");
        });
        it("should return 5941429882 after 2018 recipes", () => {
            let recipes = 2018;
            const outputLength = 10;
            let scores = new Scores();
            let elf1 = scores.addNode(3);
            let elf2 = scores.addNode(7);
    
            while(scores.getSize() < recipes + outputLength){
                let score = elf1.element + elf2.element;
                if(score < 10)
                    scores.add(score);
                else{
                    scores.add(Math.floor(score / 10));
                    scores.add(score % 10);
                }
                elf1 = scores.move(elf1.element + 1, elf1);
                elf2 = scores.move(elf2.element + 1, elf2);
            }
            let offset = -1 * (scores.getSize() - recipes);
            let start = scores.move(offset);
            expect(scores.printAsString(10, start)).to.equal("5941429882");
        });
    });
});