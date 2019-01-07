import { expect } from 'chai'
import Solution from './B'

describe("Day 24 - Puzzle B", () => {
    describe("Solution", () => {
        it("should return 51 for example case", () => {
            let output = Solution.solve("sample.txt");
            expect(output).to.equal(51);
        });
    });
});