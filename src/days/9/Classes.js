import DoublyCircularLinkedList, { Node } from '../../classes/DoublyCircularLinkedList'

export default class Marbles extends DoublyCircularLinkedList { 
    constructor(){
        super();
        this.current = null;
    }

    placeMarble(marble){
        let score = 0;
        if(this.current === null || this.size == 1){
            this.current = this.addNode(marble);
        }
        else{
            if(marble % 23 == 0){
                score += marble;
                let remove = this.removeFromNode(-7, this.current);
                score += remove.element;
                this.current = remove.next;
            }
            else{
                this.current = this.insertFromNode(marble, 2, this.current);
            }
        }
        return score;
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

    insertFromNode(element, offset, startNode){
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

    removeFromNode(offset, startNode){
        if(this.size === 0)
            return false;

        if(offset > this.size)
            offset = offset % this.size;

        let current = startNode;
        let i = 0;
        // Navigate forwards
        if(offset >= 0){
            while(i++ < offset)
                current = current.next;
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        // Navigate backwards
        else{
            offset = Math.abs(offset);
            while(i++ < offset)
                current = current.prev;
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.size--;
        return current;
    }
}