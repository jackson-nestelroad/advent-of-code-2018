import { expect } from 'chai'
import Solution from './A'

describe("Day 17 - Puzzle A", () => {
    describe("Solution", () => {
        it("should return 57 when given example case", () => {
            const output = Solution.solve("sample.txt");
            expect(output).to.equal(57);
        });
    });
});