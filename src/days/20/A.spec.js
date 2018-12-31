import { expect } from 'chai'
import Solution from './A'

describe("Day 20 - Puzzle A", () => {
    describe("getLongestPath()", () => {
        it("should return 3 when given example case 1", () => {
            let regex = "^WNE$";
            const output = Solution.getLongestPath(regex.slice(1, -1));
            expect(output.max).to.equal(3);
        });
        it("should return 10 when given example case 2", () => {
            let regex = "^ENWWW(NEEE|SSE(EE|N))$";
            const output = Solution.getLongestPath(regex.slice(1, -1));
            expect(output.max).to.equal(10);
        });
        it("should return 18 when given example case 3", () => {
            let regex = "^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$";
            regex = Solution.replaceLoops(regex);
            const output = Solution.getLongestPath(regex.slice(1, -1));
            expect(output.max).to.equal(18);
        });
        it("should return 23 when given example case 4", () => {
            let regex = "^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$";
            regex = Solution.replaceLoops(regex);
            const output = Solution.getLongestPath(regex.slice(1, -1));
            expect(output.max).to.equal(23);
        });
        it("should return 31 when given example case 5", () => {
            let regex = "^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$";
            regex = Solution.replaceLoops(regex);
            const output = Solution.getLongestPath(regex.slice(1, -1));
            expect(output.max).to.equal(31);
        });
    });
});