import { expect } from 'chai'
import Solution from './A'

describe("Day 25 - Puzzle A", () => {
    describe("Solution", () => {
        it("should return 2 for example case 1", () => {
            let output = Solution.solve("samples/1.txt");
            expect(output).to.equal(2);
        });
        it("should return 4 for example case 2", () => {
            let output = Solution.solve("samples/2.txt");
            expect(output).to.equal(4);
        });
        it("should return 3 for example case 3", () => {
            let output = Solution.solve("samples/3.txt");
            expect(output).to.equal(3);
        });
        it("should return 8 for example case 4", () => {
            let output = Solution.solve("samples/4.txt");
            expect(output).to.equal(8);
        });
    });
});