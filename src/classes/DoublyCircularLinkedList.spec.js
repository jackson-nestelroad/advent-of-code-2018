import { expect } from "chai"
import LinkedList from "./DoublyCircularLinkedList"

describe("LinkedList", () => {
    describe("add()", () => {
        it("prints added values in order", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            expect(list.print()).to.equal("100 300 200");
        });
    });
    describe("insertAt()", () => {
        it("prints added values in order", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            list.insertAt(400, 1);
            expect(list.print()).to.equal("100 400 300 200");
        });
    });
    describe("insertAt()", () => {
        it("replaces head correctly", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            list.insertAt(400, 0);
            expect(list.print()).to.equal("400 100 300 200");
        });
    });
    describe("insertAt()", () => {
        it("returns correct index when adding to head", () => {
            let list = new LinkedList();
            expect(list.add(400)).to.equal(0);
        });
    });
    describe("insertAt()", () => {
        it("returns correct index when adding to end", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            expect(list.add(400)).to.equal(3);
        });
    });
    describe("removeFrom()", () => {
        it("prints updated values in order", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            list.removeFrom(1);
            expect(list.print()).to.equal("100 200");
        });
    });
    describe("removeFrom()", () => {
        it("removes head correctly", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            list.removeFrom(0);
            expect(list.print()).to.equal("300 200");
        });
    });
    describe("removeElement()", () => {
        it("removes element correctly", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            list.removeElement(300);
            expect(list.print()).to.equal("100 200");
        });
    });
    describe("removeElement()", () => {
        it("removes head correctly", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            list.removeElement(100);
            expect(list.print()).to.equal("300 200");
        });
    });
    describe("indexOf()", () => {
        it("returns correct index of element", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            expect(list.indexOf(200)).to.equal(2);
        });
    });
    describe("indexOf()", () => {
        it("returns false when given bad element", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            expect(list.indexOf(400)).to.equal(false);
        });
    });
    describe("elementAt()", () => {
        it("returns correct element at index", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            expect(list.elementAt(1)).to.equal(300);
        });
    });
    describe("elementAt()", () => {
        it("loops around to 300 when given 4 (overflow index)", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            expect(list.elementAt(4)).to.equal(300);
        });
    });
    describe("getSize()", () => {
        it("returns correct size", () => {
            let list = new LinkedList();
            list.add(100);
            list.add(300);
            list.add(200);
            expect(list.getSize()).to.equal(3);
        });
    });
});