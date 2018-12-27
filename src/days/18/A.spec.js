import { expect } from 'chai'
import Solution from './A'

describe("Day 18 - Puzzle A", () => {
    describe("Solution", () => {
        it("should return 1147 when given example case", () => {
            const output = Solution.solve("sample.txt");
            expect(output).to.equal(1147);
        });
    });
});