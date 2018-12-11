import { expect } from "chai"
import Solution from "./A"

describe("Day 5 - Puzzle A", () => {
    describe("react()", () => {
        it("should return dabCBAcaDA when given dabAcCaCBAcCcaDA", () => {
            let input = "dabAcCaCBAcCcaDA";
            const reduced = Solution.react(input);
            expect(reduced).to.equal("dabCBAcaDA");
        });
    });
});