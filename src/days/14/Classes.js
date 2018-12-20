import DoublyCircularLinkedList, { Node } from '../../classes/DoublyCircularLinkedList'

export default class Scores extends DoublyCircularLinkedList {
    constructor(){
        super();
        for(val of arguments)
            this.add(val);
    }

    // Overloaded add function that returns the element instead of the index
    add(element){
        let node = new Node(element);
        
        // First element
        if(this.head === null){
            this.head = node;
        }

        // Add element to the end
        else{
            node.next = this.head;
            node.prev = this.head.prev;
            node.prev.next = node;
            this.head.prev = node;
        }
        this.size++;
        return element;
    }

    // Returns node opposed to index
    addNode(element){
        let node = new Node(element);
        
        // First element
        if(this.head === null){
            this.head = node;
        }

        // Add element to the end
        else{
            node.next = this.head;
            node.prev = this.head.prev;
            node.prev.next = node;
            this.head.prev = node;
        }
        this.size++;
        return node;
    }

    insertFromNode(element, offset, startNode = this.head){
        if(offset > this.size)
            offset = offset % this.size;
        
        let node = new Node(element);
        let current = startNode;
        let i = 0;
        // Navigate forwards
        if(offset >= 0){
            while(i++ < offset)
                current = current.next;

            node.next = current;
            node.prev = current.prev;
            current.prev.next = node;
            current.prev = node;
        }
        // Navigate backwards
        else{
            offset = Math.abs(offset);
            while(i++ < offset)
                current = current.prev;

            node.next = current;
            node.prev = current.prev;
            current.prev.next = node;
            current.prev = node;
        }
        this.size++;
        return node;
    }

    // Move across the list from a node
    move(offset, startNode = this.head){
        if(offset > this.size)
            offset %= this.size;
        
        let current = startNode;
        let i = 0;
        // Move forwards
        if(offset >= 0)
            while(i++ < offset)
                current = current.next;
        // Move backwards
        else{
            offset = Math.abs(offset);
            while(i++ < offset)
                current = current.prev;
        }    
        return current;
    }

    // Return values concatenated as a string
    printAsString(number = 1, startNode = this.head){
        let i = 0;
        let string = "";
        let current = startNode;
        while(i++ < number){
            string += current.element;
            current = current.next;
        }
        return string;
    }
}