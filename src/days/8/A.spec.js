import { expect } from "chai"
import Solution from "./A"

describe("Day 8 - Puzzle A", () => {
    describe("sumMetadata()", () => {
        it("should return 138 when given example case", () => {
            let input = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
            const sum = Solution.sumMetadata(input);
            expect(sum).to.eql(138);
        });
    });
});