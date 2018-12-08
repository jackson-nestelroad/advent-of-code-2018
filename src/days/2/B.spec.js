import { expect } from "chai"
import Solution from "./B"

describe("Day 2 - Puzzle B", () => {
    describe("quickSortTest()", () => {
        it("should return [a, b, c] when given [c, b, a]", () => {
            let input = ['c', 'b', 'a'];
            const sorted = Solution.quickSortTest(input);
            expect(sorted).to.eql(['a', 'b', 'c']);
        });

        it("should return [a, ab, abc, d, e, f] when given [f, a, d, abc, e, ab]", () => {
            let input = ['f', 'a', 'd', 'abc', 'e', 'ab'];
            const sorted = Solution.quickSortTest(input);
            expect(sorted).to.eql(['a', 'ab', 'abc', 'd', 'e', 'f']);
        });
    });

    describe("difference()", () => {
        it("should return [0] when comparing guy and buy", () => {
            let string1 = "guy";
            let string2 = "buy";
            const difference = Solution.difference(string1, string2);
            expect(difference).to.eql([0]);
        });

        it("should return [] when comparing HelLo and HelLo", () => {
            let string1 = "HelLo";
            let string2 = "HelLo";
            const difference = Solution.difference(string1, string2);
            expect(difference).to.eql([]);
        });

        it("should return [1, 4] when comparing Awesome and A3es0me", () => {
            let string1 = "Awesome";
            let string2 = "A3es0me";
            const difference = Solution.difference(string1, string2);
            expect(difference).to.eql([1, 4]);
        });
    });
});