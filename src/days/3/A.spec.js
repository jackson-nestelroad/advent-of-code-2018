import { expect } from "chai"
import Solution from "./A"
import { Rectangle, Coordinate } from "./Classes"

describe("Day 3 - Puzzle A", () => {
    describe("Coordinate.toString()", () => {
        it("should return 500x600 when given x=500 and y=600", () => {
            let coord = (new Coordinate(500, 600)).toString();
            expect(coord).to.equal("500x600");
        });
    });

    describe("parseRectangle()", () => {
        it("should return {1, {x: 100, y: 200}, 50, 60} when given #1 @ 100,200: 50x60", () => {
            let input = "#1 @ 100,200: 50x60";
            const parsed = Solution.parseRectangle(input);
            expect(parsed).to.eql(new Rectangle(1, new Coordinate(100, 200), 50, 60));
        });
    });

    describe("parseRectangle()", () => {
        it("should return false when given nothing", () => {
            const parsed = Solution.parseRectangle('');
            expect(parsed).to.equal(false);
        });
    });

    describe("getOverlapCount()", () => {
        it("should return 4 when given overlapping rectangles", () => {
            let input = [
                new Rectangle(1, new Coordinate(1, 3), 4, 4),
                new Rectangle(2, new Coordinate(3, 1), 4, 4),
                new Rectangle(3, new Coordinate(5, 5), 2, 2)
            ];
            const overlap = Solution.getOverlapCount(input);
            expect(overlap).to.equal(4);
        });
    });
});