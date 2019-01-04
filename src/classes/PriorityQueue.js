export class Element {
    constructor(element, priority){
        this.element = element;
        this.priority = priority;
    }
}

export default class PriorityQueue {
    constructor(){
        this.items = [];
    }

    enqueue(element, priority){
        let qElement = new Element(element, priority);
        let first = 0;
        let last = this.items.length;
        while(last > first && priority > this.items[last - 1].priority)
        {
            this.items[last] = this.items[last - 1];
            last--;
        }
        this.items[last] = qElement;
        return last;
    }

    dequeue(){
        if(this.isEmpty())
            throw "Priority Queue is empty.";
        return this.items.shift().element;
    }

    isEmpty(){
        return this.items.length == 0;
    }

    front(){
        return this.items[0];
    }

    rear(){
        return this.items[this.items.length - 1];
    }

    print(){
        return this.items.map(e => e.element).join(' ');
    }
}