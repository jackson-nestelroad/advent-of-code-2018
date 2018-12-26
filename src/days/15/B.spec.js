import { expect } from 'chai'
import Solution from './B'

describe("Day 15 - Puzzle B", () => {
    describe("Solution", () => {
        it("Example case 1", () => {
            const score = Solution.solve("./test/sample.txt");
            expect(score).to.equal(4988);
        });
        it("Example case 3", () => {
            const score = Solution.solve("./test/sample3.txt");
            expect(score).to.equal(31284);
        });
        it("Example case 4", () => {
            const score = Solution.solve("./test/sample4.txt");
            expect(score).to.equal(3478);
        });
        it("Example case 5", () => {
            const score = Solution.solve("./test/sample5.txt");
            expect(score).to.equal(6474);
        });
        it("Example case 6", () => {
            const score = Solution.solve("./test/sample6.txt");
            expect(score).to.equal(1140);
        });
    });
});