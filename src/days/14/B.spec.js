import { expect } from 'chai'
import Solution from './B'

describe("Day 14 - Puzzle A", () => {
    describe("Solution.solve()", () => {
        it("should return 9 when looking for 51589", () => {
            const output = Solution.solve("51589");
            expect(output).to.equal(9);
        });
        it("should return 5 when looking for 01245", () => {
            const output = Solution.solve("01245");
            expect(output).to.equal(5);
        });
        it("should return 18 when looking for 92510", () => {
            const output = Solution.solve("92510");
            expect(output).to.equal(18);
        });
        it("should return 2018 when looking for 59414", () => {
            const output = Solution.solve("59414");
            expect(output).to.equal(2018);
        });
    });
});