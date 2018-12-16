import { expect } from "chai"
import Algorithms from "./Algorithms"

// npm test ../classes Algorithms

describe("Algorithms", () => {
    describe("mergeSort()", () => {
        it("should return [1,2,3,4] when given [2,1,4,3]", () => {
            let input = [2,1,4,3];
            Algorithms.mergeSort(input, 0, input.length - 1);
            expect(input).to.eql([1,2,3,4]);
        });
    });

    describe("orderedInsert()", () => {
        it("should change array to [1,2,3,4] when given [1,2,4]", () => {
            let input = [1,2,4];
            Algorithms.orderedInsert(input, 3);
            expect(input).to.eql([1,2,3,4]);
        });
    });

    describe("range()", () => {
        it("should return [1,2,3,4,5] when given 1-5", () => {
            const range = Algorithms.range(1,5);
            expect(range).to.eql([1,2,3,4,5]);
        });
        it("should return [5,4,3,2,1] when given (5,1)", () => {
            const range = Algorithms.range();
            expect(range).to.eql([]);
        });
        it("should return [] when given ()", () => {
            const range = Algorithms.range();
            expect(range).to.eql([]);
        });
        it("should return [] when given (1,1)", () => {
            const range = Algorithms.range();
            expect(range).to.eql([]);
        });
        it("should return [2,4,6,8,10] when given (2,10,2)", () => {
            const range = Algorithms.range(2,10,2);
            expect(range).to.eql([2,4,6,8,10]);
        });
    });
});