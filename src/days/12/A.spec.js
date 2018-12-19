import { expect } from "chai"
import Solution from "./A"

describe("Day 12 - Puzzle A", () => {
    describe("parseRules()", () => {
        it("should return [31] when given ##### => #", () => {
            let input = [
                            "##### => #"
                        ];
            const parsed = Solution.parseRules(input);
            expect(parsed).to.eql([0b11111]);
        });
        it("should return [] when given ##.## => .", () => {
            let input = [
                            "##.## => ."
                        ];
            const parsed = Solution.parseRules(input);
            expect(parsed).to.eql([]);
        });
        it("should ignore negative results", () => {
            let input = [
                            "##.## => .",
                            "##.## => #"
                        ];
            const parsed = Solution.parseRules(input);
            expect(parsed).to.eql([0b11011]);
        });
        it("should return [25,28,4,26] with multiple inputs", () => {
            let input = [
                            "##..# => #",
                            "###.. => #",
                            "..#.. => #",
                            "##.#. => #"
                        ];
            const parsed = Solution.parseRules(input);
            expect(parsed).to.eql([0b11001, 0b11100, 0b00100, 0b11010]);
        });
    });
    describe("testPattern()", () => {
        it("should return false when given a pattern not included", () => {
            let input = "11011";
            let rules = [
                "##..# => #",
                "###.. => #",
                "..#.. => #",
                "##.#. => #"
            ];
            rules = Solution.parseRules(rules);
            const plant = Solution.testPattern(parseInt(input, 2), rules);
            expect(plant).to.equal(false);
        });
        it("should return true when given a pattern included", () => {
            let input = "00100";
            let rules = [
                "##..# => #",
                "###.. => #",
                "..#.. => #",
                "##.#. => #"
            ];
            rules = Solution.parseRules(rules);
            const plant = Solution.testPattern(parseInt(input, 2), rules);
            expect(plant).to.equal(true);
        });
    });
    describe("extendState()", () => {
        it("should return 1010100 when given 10101", () => {
            let input = "10101";
            const extended = Solution.extendState(input);
            expect(extended).to.equal("1010100");
        });
    });
});