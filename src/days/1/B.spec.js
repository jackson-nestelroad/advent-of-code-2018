import { expect } from "chai"
import Solution from "./B"

describe("Day 1 - Puzzle B", () => {
    describe("getDuplicate()", () => {
        it("should return 0 when given [+1, -1]", () => {
            let input = ['+1', '-1'];
            const duplicate = Solution.getDuplicate(input);
            expect(duplicate).to.equal(0);
        });

        it("should return 10 when given [+3, +3, +4, -2, -4]", () => {
            let input = ['+3', '+3', '+4', '-2', '-4'];
            const duplicate = Solution.getDuplicate(input);
            expect(duplicate).to.equal(10);
        });
        
        it("should return 5 when given [-6, +3, +8, +5, -6]", () => {
            let input = ['-6', '+3', '+8', '+5', '-6'];
            const duplicate = Solution.getDuplicate(input);
            expect(duplicate).to.equal(5);
        });

        it("should return 14 when given [+7, +7, -2, -7, -4]", () => {
            let input = ['+7', '+7', '-2', '-7', '-4'];
            const duplicate = Solution.getDuplicate(input);
            expect(duplicate).to.equal(14);
        });
    })
})