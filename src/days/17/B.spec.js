import { expect } from 'chai'
import Solution from './B'

describe("Day 17 - Puzzle B", () => {
    describe("Solution", () => {
        it("should return 29 when given example case", () => {
            const output = Solution.solve("sample.txt");
            expect(output).to.equal(29);
        });
    });
});