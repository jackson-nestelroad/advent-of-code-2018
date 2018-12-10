import { expect } from "chai"
import Algorithms from "./Algorithms"

describe("Day 3 - Puzzle B", () => {
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
});