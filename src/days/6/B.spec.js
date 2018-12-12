import { expect } from "chai"
import Solution from "./B"
import { Point } from "./Classes";
import Algorithms from "../../classes/Algorithms"

describe("Day 6 - Puzzle B", () => {
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
        it("Returns correct number of safe points", () => {
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

            let safePoints = 0;
            Algorithms.range(X.min, X.max).forEach(x => {
                Algorithms.range(Y.min, Y.max).forEach(y => {
                    let distances = Points.map(point => point.distance(x,y));
                    let sum = distances.reduce((a,b) => a + b, 0);
                    if(sum < 32)
                        safePoints++;
                });
            });

            expect(safePoints).to.equal(16);
        });
    });
});