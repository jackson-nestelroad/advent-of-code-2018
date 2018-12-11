import { expect } from "chai"
import Solution from "./A"
import { Log } from "./Classes"

describe("Day 4 - Puzzle B", () => {
    describe("parseLog()", () => {
        it("should return the correct Log object when parsing string", () => {
            let input = "[1518-05-14 23:58] Guard #1559 begins shift";
            const object = Solution.parseLog(input);
            expect(object).to.eql(new Log(new Date("1518-05-14 23:58"), "Guard #1559 begins shift"));
        });
    });
    describe("insertByDate", () => {
        it("should return [4,1,3,2] when inserting by log time", () => {
            let input = [
                new Log(new Date("1518-05-14 23:00"), "falls asleep"),
                new Log(new Date("1518-05-28 06:00"), "falls asleep"),
                new Log(new Date("1518-05-28 05:00"), "falls asleep"),
                new Log(new Date("1518-05-13 16:00"), "falls asleep")
            ];
            let correct = [
                input[3],
                input[0],
                input[2],
                input[1]
            ];
            let sorted = [];
            input.forEach(log => {
                Solution.insertByDate(sorted, log);
            });
            expect(sorted).to.eql(correct);
        });
    });
    describe("Log.getGuardID()", () => {
        it("should return 3341 when given a shift change", () => {
            let input = new Log(new Date("1518-05-14 23:58"), "Guard #3341 begins shift");
            const output = input.getGuardID();
            expect(output).to.equal(3341);
        });
        it("should return false when not given a shift change", () => {
            let input = new Log(new Date("1518-05-14 23:58"), "wakes up");
            const output = input.getGuardID();
            expect(output).to.equal(false);
        });
    });
});