import { expect } from 'chai'
import Solution from './A'
import { Registry, Instructions } from './Classes'

describe("Day 16 - Puzzle A", () => {
    describe("Instructions", () => {
        it("addr", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["addr"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 1 + 2, 1]);
        });
        it("addi", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["addi"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 1 + 1, 1]);
        });
        it("mulr", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["mulr"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 1 * 2, 1]);
        });
        it("muli", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["muli"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 1 * 1, 1]);
        });
        it("banr", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["banr"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 1 & 2, 1]);
        });
        it("bani", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["bani"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 1 & 1, 1]);
        });
        it("borr", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["borr"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 1 | 2, 1]);
        });
        it("bori", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["bori"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 1 | 1, 1]);
        });
        it("setr", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["setr"](registry, ...[2, 1, 1]);
            expect(registry.registers).to.eql([3, 1, 1, 1]);
        });
        it("seti", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["seti"](registry, ...[4, 1, 2]);
            expect(registry.registers).to.eql([3, 2, 4, 1]);
        });
        it("gtir", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["gtir"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, Number(2 > 2), 1]);
        });
        it("gtri", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["gtri"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, Number(1 > 1), 1]);
        });
        it("gtrr", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["gtrr"](registry, ...[1, 2, 2]);
            expect(registry.registers).to.eql([3, 2, Number(2 > 1), 1]);
        });
        it("eqir", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["eqir"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, Number(2 == 2), 1]);
        });
        it("eqri", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["eqri"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, Number(1 == 1), 1]);
        });
        it("eqrr", () => {
            let registry = new Registry(4);
            registry.setAll([3, 2, 1, 1]);
            Instructions["eqrr"](registry, ...[2, 1, 2]);
            expect(registry.registers).to.eql([3, 2, Number(1 == 2), 1]);
        });
    });
});