'use strict';

export const Instructions = {
    // Add register
    addr: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A) + Registry.get(B));
    },

    // Add immediate
    addi: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A) + B);
    },

    // Multiply register
    mulr: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A) * Registry.get(B));
    },

    // Multiply immediate
    muli: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A) * B);
    },

    // Bitwise AND register
    banr: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A) & Registry.get(B));
    },

    // Bitwise AND immediate
    bani: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A) & B);
    },

    // Bitwise OR register
    borr: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A) | Registry.get(B));
    },

    // Bitwise OR immediate
    bori: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A) | B);
    },

    // Set register
    setr: function(Registry, A, B, C){
        Registry.set(C, Registry.get(A));
    },

    // Set immediate
    seti: function(Registry, A, B, C){
        Registry.set(C, A);
    },

    // Greater-than immediate/register
    gtir: function(Registry, A, B, C){
        Registry.set(C, Number(A > Registry.get(B)));
    },

    // Greater-than register/immediate
    gtri: function(Registry, A, B, C){
        Registry.set(C, Number(Registry.get(A) > B));
    },

    // Greater-than register/register
    gtrr: function(Registry, A, B, C){
        Registry.set(C, Number(Registry.get(A) > Registry.get(B)));
    },

    // Equal immediate/register
    eqir: function(Registry, A, B, C){
        Registry.set(C, Number(A == Registry.get(B)));
    },

    // Equal register/immediate
    eqri: function(Registry, A, B, C){
        Registry.set(C, Number(Registry.get(A) == B));
    },

    // Equal register/registers
    eqrr: function(Registry, A, B, C){
        Registry.set(C, Number(Registry.get(A) == Registry.get(B)));
    }
}

export class Registry {
    constructor(size){ 
        this.registers = new Array(size).fill(0);
        this.size = size;
    }

    get(i){
        return this.registers[i];
    }

    set(i, val){
        this.registers[i] = val;
        return val;
    }

    setAll(array){
        if(array.length != this.size)
            throw "Cannot set registry to array of different size.";
        this.registers = array.slice(0);
        return true;
    }

    fill(val = 0){
        this.registers.fill(val);
    }

    toString(){
        return this.registers.toString();
    }
}