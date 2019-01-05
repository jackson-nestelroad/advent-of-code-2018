import { expect } from 'chai'
import Solution from './B'

describe("Day 23 - Puzzle B", () => {
    describe("Solution", () => {
        it("should return 36 for example case", () => {
            let output = Solution.solve("sample.txt");
            expect(output).to.equal(36);
        });
    });
});