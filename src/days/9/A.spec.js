import { expect } from "chai"
import Solution from "./A"

describe("Day 9 - Puzzle A", () => {
    describe("sumMetadata()", () => {
        it("should return [10, 1618]", () => {
            let input = "10 players; last marble is worth 1618 points"
            const numbers = Solution.parseNumbers(input);
            expect(numbers).to.eql([10, 1618]);
        });
    });
    describe("startGame()", () => {
        it("should return high score of 32 with example case 1", () => {
            let players = 9;
            let marbles = 25;
    
            let scores = Solution.startGame(players, marbles);
            let highScore = Math.max(...scores);
            expect(highScore).to.equal(32);
        });
        it("should return high score of 8317 with example case 2", () => {
            let players = 10;
            let marbles = 1618;
    
            let scores = Solution.startGame(players, marbles);
            let highScore = Math.max(...scores);
            expect(highScore).to.equal(8317);
        });
        it("should return high score of 146373 with example case 3", () => {
            let players = 13;
            let marbles = 7999;
    
            let scores = Solution.startGame(players, marbles);
            let highScore = Math.max(...scores);
            expect(highScore).to.equal(146373);
        });
        it("should return high score of 2764 with example case 4", () => {
            let players = 17;
            let marbles = 1104;
    
            let scores = Solution.startGame(players, marbles);
            let highScore = Math.max(...scores);
            expect(highScore).to.equal(2764);
        });
        it("should return high score of 54718 with example case 5", () => {
            let players = 21;
            let marbles = 6111;
    
            let scores = Solution.startGame(players, marbles);
            let highScore = Math.max(...scores);
            expect(highScore).to.equal(54718);
        });
        it("should return high score of 37305 with example case 6", () => {
            let players = 30;
            let marbles = 5807;
    
            let scores = Solution.startGame(players, marbles);
            let highScore = Math.max(...scores);
            expect(highScore).to.equal(37305);
        });
    });
});