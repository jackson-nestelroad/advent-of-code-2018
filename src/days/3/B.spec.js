import { expect } from "chai"
import Solution from "./B"
import { Rectangle, Coordinate } from "./Classes"

describe("Day 3 - Puzzle B", () => {
    describe("insertByCoordinate()", () => {
        it("should return [3, 2, 1, 4] (rectangles sorted by X coordinate)", () => {
            let input = [
                new Rectangle(1, new Coordinate(3, 3), 1, 1),
                new Rectangle(2, new Coordinate(2, 2), 1, 1),
                new Rectangle(3, new Coordinate(1, 1), 1, 1),
                new Rectangle(4, new Coordinate(4, 4), 1, 1)
            ];
            let sorted = [
                new Rectangle(3, new Coordinate(1, 1), 1, 1),
                new Rectangle(2, new Coordinate(2, 2), 1, 1),
                new Rectangle(1, new Coordinate(3, 3), 1, 1),
                new Rectangle(4, new Coordinate(4, 4), 1, 1)
            ];
            let rectanglesByX = [];
            input.forEach(rectangle => {
                Solution.insertByCoordinate(rectanglesByX, rectangle, 'x');
            });
            expect(rectanglesByX).to.eql(sorted);
        });
    });

    describe("Rectangle.isOverlapping()", () => {
        it("should return true when given two overlapping rectangles", () => {
            let rectangle1 = new Rectangle(1, new Coordinate(1, 3), 4, 4);
            let rectangle2 = new Rectangle(2, new Coordinate(3, 1), 4, 4);
            const overlapping = rectangle1.isOverlapping(rectangle2);
            expect(overlapping).to.equal(true);
        });

        it("should return true when given two overlapping rectangles", () => {
            let rectangle1 = new Rectangle(1, new Coordinate(1, 9), 10, 1);
            let rectangle2 = new Rectangle(2, new Coordinate(2, 2), 2, 10);
            const overlapping = rectangle1.isOverlapping(rectangle2);
            expect(overlapping).to.equal(true);
        });

        it("should return false when given two non-overlapping rectangles", () => {
            let rectangle1 = new Rectangle(1, new Coordinate(1, 3), 4, 4);
            let rectangle2 = new Rectangle(2, new Coordinate(5, 5), 2, 2);
            const overlapping = rectangle1.isOverlapping(rectangle2);
            expect(overlapping).to.equal(false);
        });

        it("should return false when given two non-overlapping rectangles", () => {
            let rectangle1 = new Rectangle(181, new Coordinate(1, 619), 12, 21);
            let rectangle2 = new Rectangle(182, new Coordinate(700, 637), 25, 15);
            const overlapping = rectangle1.isOverlapping(rectangle2);
            expect(overlapping).to.equal(false);
        });
    });
});