import { expect } from 'chai'
import Solution from './A'
import Cart from './Classes'

describe("Day 13 - Puzzle A", () => {
    describe("sortCarts()", () => {
        it("should order carts by y, then x", () => {
            let input = [
                new Cart(0, 1),
                new Cart(0, 2),
                new Cart(1, 2),
                new Cart(0, 0),
                new Cart(3, 3),
                new Cart(1, 1)
            ];
            let sorted = [
                new Cart(0, 0),
                new Cart(0, 1),
                new Cart(1, 1),
                new Cart(0, 2),
                new Cart(1, 2),
                new Cart(3, 3)

            ].map(cart => [cart.x, cart.y]);
            const output = Solution.sortCarts(input).map(cart => [cart.x, cart.y]);
            expect(output).to.eql(sorted);
        });
    });
    describe("Cart.move()", () => {
        it("should decrement y when moving up", () => {
            let cart = new Cart(1, 1, '^', '|');
            cart.move();
            const correct = {
                x: 1,
                y: 0
            }
            const output = {
                x: cart.x,
                y: cart.y
            }
            expect(output).to.eql(correct);
        });
        it("should increment x when moving right", () => {
            let cart = new Cart(1, 1, '>', '-');
            cart.move();
            const correct = {
                x: 2,
                y: 1
            }
            const output = {
                x: cart.x,
                y: cart.y
            }
            expect(output).to.eql(correct);
        });
        it("should increment y when moving udown", () => {
            let cart = new Cart(1, 1, 'v', '|');
            cart.move();
            const correct = {
                x: 1,
                y: 2
            }
            const output = {
                x: cart.x,
                y: cart.y
            }
            expect(output).to.eql(correct);
        });
        it("should decrement x when moving left", () => {
            let cart = new Cart(1, 1, '<', '-');
            cart.move();
            const correct = {
                x: 0,
                y: 1
            }
            const output = {
                x: cart.x,
                y: cart.y
            }
            expect(output).to.eql(correct);
        });
    });
    describe("Cart.makeTurn()", () => {
        it("should do nothing if it is not on a turn space", () => {
            let cart = new Cart(1, 1, '^', '|');
            cart.makeTurn();
            expect(cart.dir).to.eql('^');
        });
        it("should turn left when ^ on \\", () => {
            let cart = new Cart(1, 1, '^', '\\');
            cart.makeTurn();
            expect(cart.dir).that.eql('<');
        });
        it("should turn right when ^ on /", () => {
            let cart = new Cart(1, 1, '^', '/');
            cart.makeTurn();
            expect(cart.dir).that.eql('>');
        });
        it("should choose to turn left when ^ on + first time", () => {
            let cart = new Cart(1, 1, '^', '+');
            cart.makeTurn();
            expect(cart.dir).that.eql('<');
        });
        it("should choose to go straight when ^ on + second time", () => {
            let cart = new Cart(1, 1, '^', '+');
            cart.turnChoice += 1;
            cart.makeTurn();
            expect(cart.dir).that.eql('^');
        });
        it("should choose to turn right when ^ on + third time", () => {
            let cart = new Cart(1, 1, '^', '+');
            cart.turnChoice += 2;
            cart.makeTurn();
            expect(cart.dir).that.eql('>');
        });
        it("should choose to turn left when ^ on + fourth time", () => {
            let cart = new Cart(1, 1, '^', '+');
            cart.turnChoice += 3;
            cart.makeTurn();
            expect(cart.dir).that.eql('<');
        });
    });
});