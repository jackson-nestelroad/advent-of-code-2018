import { expect } from 'chai'
import Solution from './B'

describe("Day 22 - Puzzle B", () => {
    describe("Solution", () => {
        it("should return 45 for example case", () => {
            let output = Solution.solve("sample.txt");
            expect(output).to.equal(45);
        });
    });
});