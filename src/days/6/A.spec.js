import { expect } from "chai"
import Solution from "./A"
import { Point } from "./Classes";

describe("Day 6 - Puzzle A", () => {
    describe("Point.distance()", () => {
        it("should return 5 when given (1,1) and (3,4)", () => {
            let input = new Point(1,1);
            const distance = input.distance(new Point(3,4));
            expect(distance).to.equal(5);
        });
        it("should return 5 when given (1,1) and (3,4)", () => {
            let input = new Point(1,1);
            const distance = input.distance(3,4);
            expect(distance).to.equal(5);
        });
    });
    describe("Program test case", () => {
        it("Returns correct areas", () => {
            let Points = [
                new Point(1,1),
                new Point(1,6),
                new Point(8,3),
                new Point(3,4),
                new Point(5,5),
                new Point(8,9)
            ];
            let X = { min: 1, max: 8 };
            let Y = { min: 1, max: 9 };

            // Test program here
        });
    });
});