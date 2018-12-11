import { expect } from "chai"
import Solution from "./B"
import { Polymer } from "./Classes"

describe("Day 5 - Puzzle A", () => {
    describe("Polymer.react()", () => {
        it("should return dabCBAcaDA when given dabAcCaCBAcCcaDA", () => {
            let input = new Polymer("dabAcCaCBAcCcaDA");
            const reduced = input.react();
            expect(reduced).to.eql(new Polymer("dabCBAcaDA"));
        });
    });
    describe("Polymer.remove()", () => {
        it("should return dabAaBAaDA when removing C from dabAcCaCBAcCcaDA", () => {
            let input = new Polymer("dabAcCaCBAcCcaDA");
            const reduced = input.remove("C");
            expect(reduced).to.eql(new Polymer("dabAaBAaDA"));
        });
        it("should return dbcCCBcCcD when removing A from dabAcCaCBAcCcaDA", () => {
            let input = new Polymer("dabAcCaCBAcCcaDA");
            const reduced = input.remove("a");
            expect(reduced).to.eql(new Polymer("dbcCCBcCcD"));
        });
    });
});