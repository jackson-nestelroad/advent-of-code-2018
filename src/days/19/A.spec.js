import { expect } from 'chai'
import Solution from './A'

describe("Day 19 - Puzzle A", () => {
    describe("Solution", () => {
        it("should return [7,5,6,0,0,9] when given example case", () => {
            const output = Solution.solve("sample.txt");
            expect(output.registers).to.eql([7,5,6,0,0,9]);
        });
    });
});