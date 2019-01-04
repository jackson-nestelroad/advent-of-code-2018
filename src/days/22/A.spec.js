import { expect } from 'chai'
import Solution from './A'
import { Coordinate, Region, Cave } from './ClassesA'

describe("Day 22 - Puzzle A", () => {
    let cave = new Cave(0, 0, 510, new Coordinate(10,10));
    describe("Map.createRegion()", () => {
        it("should return { 0, 510, 0 } for 0,0, depth 510", () => {
            let coord = new Coordinate(0, 0);
            const region = cave.createRegion(coord);
            cave.map[coord] = region;
            expect(region).to.eql(new Region(0, 510, 0));
        });
        it("should return { 16807, 17317, 1 } for 1,0, depth 510", () => {
            let coord = new Coordinate(1, 0);
            const region = cave.createRegion(coord);
            cave.map[coord] = region;
            expect(region).to.eql(new Region(16807, 17317, 1));
        });
        it("should return { 48271, 8415, 0 } for 0,1, depth 510", () => {
            let coord = new Coordinate(0, 1);
            const region = cave.createRegion(coord);
            cave.map[coord] = region;
            expect(region).to.eql(new Region(48271, 8415, 0));
        });
        it("should return { 145722555, 1805, 2 } for 1,1, depth 510", () => {
            let coord = new Coordinate(1, 1);
            const region = cave.createRegion(coord);
            cave.map[coord] = region;
            expect(region).to.eql(new Region(145722555, 1805, 2));
        });
        it("should return { 0, 510, 0 } for 10,10 (target), depth 510", () => {
            let coord = new Coordinate(10, 10);
            const region = cave.createRegion(coord);
            cave.map[coord] = region;
            expect(region).to.eql(new Region(0, 510, 0));
        });
    });
    describe("Cave.createMap()", () => {
        it("should mirror results above", () => {
            let cave = new Cave(10, 10, 510, new Coordinate(10,10));
            const passed =  JSON.stringify(cave.map[new Coordinate(0,0)]) == JSON.stringify(new Region(0, 510, 0)) && 
                            JSON.stringify(cave.map[new Coordinate(1,0)]) == JSON.stringify(new Region(16807, 17317, 1)) &&
                            JSON.stringify(cave.map[new Coordinate(0,1)]) == JSON.stringify(new Region(48271, 8415, 0)) &&
                            JSON.stringify(cave.map[new Coordinate(1,1)]) == JSON.stringify(new Region(145722555, 1805, 2)) &&
                            JSON.stringify(cave.map[new Coordinate(10,10)]) == JSON.stringify(new Region(0, 510, 0));
            expect(passed).to.equal(true);
        });
        it("should create a risk level sum of 114", () => {
            let cave = new Cave(10, 10, 510, new Coordinate(10,10));
            const sum = Object.keys(cave.map).reduce((sum, a) => sum += cave.map[a].type, 0);
            expect(sum).to.equal(114);
        });
    });
});