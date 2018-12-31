import { expect } from 'chai'
import Solution from './B'

describe("Day 20 - Puzzle B", () => {
    describe("Solution", () => {
        it("should return 15 when given example case 4, min 16", () => {
            let regex = "^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$";
            regex = Solution.replaceLoops(regex);
            let allPaths = Solution.getPaths(regex.slice(1, -1)).paths;
            const output = Solution.getRoomsWithMinDistance(allPaths[0], 16);
            expect(output).to.equal(15);
        });
        it("should return 28 when given example case 5, min 20", () => {
            let regex = "^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$";
            regex = Solution.replaceLoops(regex);
            Solution.visited = { };
            let allPaths = Solution.getPaths(regex.slice(1, -1)).paths;
            const output = Solution.getRoomsWithMinDistance(allPaths[0], 20);
            expect(output).to.equal(28);
        });
    });
});