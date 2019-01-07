import { expect } from 'chai'
import Solution from './A'

describe("Day 24 - Puzzle A", () => {
    describe("Solution", () => {
        it("should return 5216 for example case", () => {
            let output = Solution.solve("sample.txt");
            expect(output).to.equal(5216);
        });
    });
});