import { expect } from "chai"
import Solution from "./A"

describe("Day 2 - Puzzle A", () => {
    describe("checkCode()", () => {
        it("should return 1 when given abcdef", () => {
            let input = 'abcdef';
            const duplicates = Solution.checkCode(input);
            expect(duplicates).to.equal(1);
        });

        it("should return 7 when given bababc", () => {
            let input = 'bababc';
            const duplicates = Solution.checkCode(input);
            expect(duplicates).to.equal(7);
        });

        it("should return 3 when given abbcde", () => {
            let input = 'abbcde';
            const duplicates = Solution.checkCode(input);
            expect(duplicates).to.equal(3);
        });

        it("should return 5 when given abcccd", () => {
            let input = 'abcccd';
            const duplicates = Solution.checkCode(input);
            expect(duplicates).to.equal(5);
        });

        it("should return 3 when given aabcdd", () => {
            let input = 'aabcdd';
            const duplicates = Solution.checkCode(input);
            expect(duplicates).to.equal(3);
        });

        it("should return 3 when given abcdee", () => {
            let input = 'abcdee';
            const duplicates = Solution.checkCode(input);
            expect(duplicates).to.equal(3);
        });

        it("should return 5 when given ababab", () => {
            let input = 'ababab';
            const duplicates = Solution.checkCode(input);
            expect(duplicates).to.equal(5);
        });
    })
})