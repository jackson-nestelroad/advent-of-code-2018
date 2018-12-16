class Node {
    constructor(element){
        this.element = element;
        this.next = null;
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
        let index = 0;
        let current;
        
        // First element
        if(this.head === null)
            this.head = node;

        // Add element to the end
        else{
            current = this.head;
            // Iterate until we get to the end of the list
            while(current.next){
                index++;
                current = current.next;
            }
            index++;
            current.next = node;
        }
        this.size++;
        return index;
    }

    // Add element at a certain index
    insertAt(element, index){
        // Index is at the end of the list
        if(index > this.size)
            return -1;

        let node = new Node(element);

        // Replacing the head
        if(index === 0){
            node.next = this.head;
            this.head = node;
        }
        else{
            let current = this.head;
            let previous = null;
            let i = 0;
            // Get to the index we are inserting at
            while(i < index){
                i++;
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        this.size++;
        return index;
    }

    // Remove an element at a specific index
    removeFrom(index){
        if(index > this.size)
            return -1;
        
        let current = this.head;
        let previous = null;
        let i = 0;

        // Delete head
        if(index === 0){
            this.head = current.next;
        }
        else{
            // Get to the index we are removing at
            while(i < index){
                i++;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.size--;
        return current.element;
    }

    // Remove an element
    removeElement(element){
        let current = this.head;
        let previous = null;
        // Find the element to delete
        while(current != null){
            if(current.element === element){
                if(previous == null)
                    this.head = current.next;
                else   
                    previous.next = current.next;
                this.size--;
                return current.element;
            }
            previous = current;
            current = current.next;
        }
        return false;
    }

    // Get index of element
    indexOf(element){
        let count = 0;
        let current = this.head;
        // Iterate to our index
        while(current != null){
            if(current.element === element)
                return count;
            count++;
            current = current.next;
        }
        return false;
    }

    // Get element at index
    elementAt(index){
        if(index > this.size)
            return false;

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
        while(current){
            str += `${current.element} `;
            current = current.next;
        }
        return str.trim();
    }
}