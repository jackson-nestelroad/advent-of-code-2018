import { expect } from "chai"
import Solution from "./A"
import Grid from "./Classes"

describe("Day 11 - Puzzle A", () => {
    describe("getPower()", () => {
        it("should return 4 when given 3,5,8", () => {
            const power = Solution.getPower(3, 5, 8);
            expect(power).to.equal(4);
        });
        it("should return -5 when given 122,79,57", () => {
            const power = Solution.getPower(122, 79, 57);
            expect(power).to.equal(-5);
        });
    });
    describe("getPartisalSum()", () => {
        it("should return 5 when given 0,0, 1,1", () => {
            // let actualGrid = [
            //                     [5, 2, 3, 4, 1],
            //                     [1, 5, 4, 2, 3],
            //                     [2, 2, 1, 3, 4],
            //                     [3, 5, 6, 4, 5],
            //                     [4, 1, 3, 2, 6]
            //                 ];
            let grid = [    
                            [5, 7, 10, 14, 15],
                            [6, 13, 20, 26, 30],
                            [8, 17, 25, 34, 42],
                            [11, 25, 39, 52, 65],
                            [15, 30, 47, 62, 81]
                        ];
            let sumTable = new Grid(5, 5, 0);
            sumTable.grid = grid;
            const sum = Solution.getPartialSum(sumTable, 0, 0, 1, 1);
            expect(sum).to.equal(5);
        });
        it("should return 5 when given 1,1, 1,1", () => {
            let grid = [    
                            [5, 7, 10, 14, 15],
                            [6, 13, 20, 26, 30],
                            [8, 17, 25, 34, 42],
                            [11, 25, 39, 52, 65],
                            [15, 30, 47, 62, 81]
                        ];
            let sumTable = new Grid(5, 5, 0);
            sumTable.grid = grid;
            const sum = Solution.getPartialSum(sumTable, 1, 1, 1, 1);
            expect(sum).to.equal(5);
        });
        it("should return 17 when given 2,3, 3,2", () => {
            let grid = [    
                            [5, 7, 10, 14, 15],
                            [6, 13, 20, 26, 30],
                            [8, 17, 25, 34, 42],
                            [11, 25, 39, 52, 65],
                            [15, 30, 47, 62, 81]
                        ];
            let sumTable = new Grid(5, 5, 0);
            sumTable.grid = grid;
            const sum = Solution.getPartialSum(sumTable, 2, 3, 3, 2);
            expect(sum).to.equal(17);
        });
    });
});