import { expect } from "chai"
import Solution from "./B"

describe("Day 8 - Puzzle B", () => {
    describe("sumMetadata()", () => {
        it("should return 66 when given example case", () => {
            let input = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
            const root = Solution.getValue(input);
            expect(root).to.eql(66);
        });
    });
});