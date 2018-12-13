import { expect } from "chai"
import Solution from "./B"
import { Instruction } from "./Classes"
 
describe("Day 7 - Puzzle B", () => {
    describe("Instruction.parse()", () => {
        it("should return [A,B] when given instruction", () => {
            let input = "Step A must be finished before step B can begin.";
            const parsed = Solution.parse(input);
            expect(parsed).to.eql(['A', 'B']);
        });
    });
    describe("getToWork()", () => {
        it("should return 15 when given the example case", () => {
            let input = [
                "Step C must be finished before step A can begin.",
                "Step C must be finished before step F can begin.",
                "Step A must be finished before step B can begin.",
                "Step A must be finished before step D can begin.",
                "Step B must be finished before step E can begin.",
                "Step D must be finished before step E can begin.",
                "Step F must be finished before step E can begin."
            ];

            let parsedInput = input.map(str => Solution.parse(str));

            let instructions = Solution.formatInstructions(parsedInput);

            let letters = Object.keys(instructions).sort();
            let queue = { };
            letters.forEach(letter => {
                if(instructions[letter].before.length == 0)
                    queue[letter] = true;
            });

            let workers = 2;
            let time = Solution.getToWork(instructions, queue, workers);
            expect(time).to.equal(15);
        });
    });
});