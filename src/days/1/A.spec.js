import { expect } from "chai"
import Solution from "./A"

describe("Day 1 - Puzzle A", () => {
    describe("calculateFrequency()", () => {
        it("should return 3 when given [+1, +1, +1]", () => {
            let input = ['+1', '+1', '+1'];
            const frequency = Solution.calculateFrequency(input);
            expect(frequency).to.equal(3);
        });

        it("should return 0 when given [+1, +1, -2]", () => {
            let input = ['+1', '+1', '-2'];
            const frequency = Solution.calculateFrequency(input);
            expect(frequency).to.equal(0);
        });

        it("should return -6 when given [-1, -2, -3]", () => {
            let input = ['-1', '-2', '-3'];
            const frequency = Solution.calculateFrequency(input);
            expect(frequency).to.equal(-6);
        });
    })
})