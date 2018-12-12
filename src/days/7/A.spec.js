import { expect } from "chai"
import Solution from "./A"

describe("Day 7 - Puzzle A", () => {
    describe("Instruction.parse()", () => {
        it("should return [A,B] when given instruction", () => {
            let input = "Step A must be finished before step B can begin.";
            const parsed = Solution.parse(input);
            expect(parsed).to.eql(['A', 'B']);
        });
    });
    describe("formatInstructions()", () => {
        it("should return the correct objects when given the example case", () => {
            let input = [
                "Step C must be finished before step A can begin.",
                "Step C must be finished before step F can begin.",
                "Step A must be finished before step B can begin.",
                "Step A must be finished before step D can begin.",
                "Step B must be finished before step E can begin.",
                "Step D must be finished before step E can begin.",
                "Step F must be finished before step E can begin."
            ];

            let output = {
                C: {
                    before: [],
                    after: ['A', 'F'],
                    done: false
                },
                A: {
                    before: ['C'],
                    after: ['B', 'D'],
                    done: false
                },
                B: {
                    before: ['A'],
                    after: ['E'],
                    done: false
                },
                D: {
                    before: ['A'],
                    after: ['E'],
                    done: false
                },
                F: {
                    before: ['C'],
                    after: ['E'],
                    done: false
                },
                E: {
                    before: ['B', 'D', 'F'],
                    after: [],
                    done: false
                }
            };

            let order = input.map(str => Solution.parse(str));
            const instructions = Solution.formatInstructions(order);
            expect(instructions).to.eql(output);
        });
    });
    describe("execute()", () => {
        it("should return CABDFE when given the example case", () => {
            let input = [
                "Step C must be finished before step A can begin.",
                "Step C must be finished before step F can begin.",
                "Step A must be finished before step B can begin.",
                "Step A must be finished before step D can begin.",
                "Step B must be finished before step E can begin.",
                "Step D must be finished before step E can begin.",
                "Step F must be finished before step E can begin."
            ];

            let order = input.map(str => Solution.parse(str));
            const instructions = Solution.formatInstructions(order);

            let first = Object.keys(instructions).sort((a,b) => a.localeCompare(b))[1];
            let queue = Solution.execute(first, instructions);
            expect(queue).to.equal("CABDFE");
        });
    });
});