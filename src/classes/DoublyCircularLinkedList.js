export class Node {
    constructor(element){
        this.element = element;
        this.prev = this;
        this.next = this;
    }
}

export default class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }

    // Add element to the end of the list
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
        return this.size - 1;
    }

    // Add element at a certain index
    insertAt(element, index){
        // Index is at the end of the list
        if(index > this.size)
            index = index % this.size;

        let node = new Node(element);

        // Replacing the head
        if(index === 0){
            node.next = this.head;
            node.prev = this.head.prev;
            this.head.prev = node;
            this.head = node;
        }
        else{
            let current = this.head;
            let i = 0;
            // Get to the index we are inserting at
            while(i++ < index){
                current = current.next;
            }
            node.next = current;
            node.prev = current.prev;
            current.prev.next = node;
            current.prev = node;
        }
        this.size++;
        return index;
    }

    // Remove an element at a specific index
    removeFrom(index){
        if(index > this.size)
            index = index % this.size;
        
        let current = this.head;
        let i = 0;

        // Delete head
        if(index === 0){
            current.next.prev = this.head.prev;
            this.head.prev.next = current.next;
            this.head = current.next;
        }
        else{
            // Get to the index we are removing at
            while(i < index){
                i++;
                current = current.next;
            }
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.size--;
        return current.element;
    }

    // Remove an element
    removeElement(element){
        let current = this.head;
        // Find the element to delete
        for(let i = 0; i < this.size; i++){
            if(current.element === element){
                current.prev.next = current.next;
                current.next.prev = current.prev;
                if(i === 0){
                    this.head = current.next;
                }
                this.size--;
                return current.element;
            }
            current = current.next;
        }
        return false;
    }

    // Get index of element
    indexOf(element){
        let current = this.head;
        // Iterate to our index
        for(let i = 0; i < this.size; i++){
            if(current.element === element)
                return i;
            current = current.next;
        }
        return false;
    }

    // Get element at index
    elementAt(index){
        if(index > this.size)
            index = index % this.size;

        let i = 0;
        let current = this.head;
        // Iterate to our index
        while(i < index){
            i++;
            current = current.next;
        }
        return current.element;
    }

    // Get size of list
    getSize(){
        return this.size;
    }

    // Print all elements to console
    print(){
        let current = this.head;
        let str = "";
        for(let i = 0; i < this.size; i++){
            str += `${current.element} `;
            current = current.next;
        }
        return str.trim();
    }
}