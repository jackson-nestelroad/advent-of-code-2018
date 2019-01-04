import { expect } from "chai"
import PriorityQueue, { Element } from "./PriorityQueue"

describe("PriorityQueue", () => {
    describe("enqueue()", () => {
        it("prints added values in order of priority", () => {
            let queue = new PriorityQueue();
            queue.enqueue(1, 1);
            queue.enqueue(3, 2);
            queue.enqueue(2, 10);
            queue.enqueue(4, 8);
            expect(queue.print()).to.equal("2 4 3 1")
        });
    });
    describe("dequeue()", () => {
        it("returns value with highest priority", () => {
            let queue = new PriorityQueue();
            queue.enqueue(1, 1);
            queue.enqueue(3, 2);
            queue.enqueue(2, 10);
            queue.enqueue(4, 8);
            expect(queue.dequeue()).to.equal(2);
        });
        it("throws exception on empty queue", () => {
            let queue = new PriorityQueue();
            let thrown = false;
            try{
                queue.dequeue();
            }
            catch(err){
                thrown = true;
            }
            expect(thrown).to.equal(true);
        });
    });
    describe("isEmpty()", () => {
        it("returns true when queue is empty", () => {
            let queue = new PriorityQueue();
            expect(queue.isEmpty()).to.equal(true);
        });
        it("returns false when queue is not empty", () => {
            let queue = new PriorityQueue();
            queue.enqueue(1, 1);
            expect(queue.isEmpty()).to.equal(false);
        }); 
    });
    describe("front()", () => {
        it("returns first item in queue", () => {
            let queue = new PriorityQueue();
            queue.enqueue(1, 1);
            queue.enqueue(3, 2);
            queue.enqueue(2, 10);
            queue.enqueue(4, 8);
            expect(queue.front()).to.eql(new Element(2, 10));
        });
    });
    describe("rear()", () => {
        it("returns last item in queue", () => {
            let queue = new PriorityQueue();
            queue.enqueue(1, 1);
            queue.enqueue(3, 2);
            queue.enqueue(2, 10);
            queue.enqueue(4, 8);
            expect(queue.rear()).to.eql(new Element(1, 1));
        });
    });
});