import { expect } from 'chai'
import Solution from './A'

describe("Day 15 - Puzzle A", () => {
    describe("Solution", () => {
        it("Example case 1", () => {
            const score = Solution.solve("./test/sample.txt");
            expect(score).to.equal(27730);
        });
        it("Example case 2", () => {
            const score = Solution.solve("./test/sample2.txt");
            expect(score).to.equal(36334);
        });
        it("Example case 3", () => {
            const score = Solution.solve("./test/sample3.txt");
            expect(score).to.equal(39514);
        });
        it("Example case 4", () => {
            const score = Solution.solve("./test/sample4.txt");
            expect(score).to.equal(27755);
        });
        it("Example case 5", () => {
            const score = Solution.solve("./test/sample5.txt");
            expect(score).to.equal(28944);
        });
        it("Example case 6", () => {
            const score = Solution.solve("./test/sample6.txt");
            expect(score).to.equal(18740);
        });
    });
});