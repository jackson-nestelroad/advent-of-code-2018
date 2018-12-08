'use strict';

import fs from 'fs';

const Solution = {
    solve: function(){
        // Read codes
        let codes = this.readFile().split('\n');

        // QuickSort the codes
        this.quickSort(codes, 0, codes.length - 1);

        // Compare each code with the one closest to it alphabetically
        for(let k = 0; k < codes.length - 1; k++){
            let difference;
            if(codes[k].length == codes[k + 1].length){

                // Get the difference between the strings
                difference = this.difference(codes[k], codes[k + 1]);

                // Solution is found when difference is only one letter
                if(difference.length == 1){
                    return codes[k].substring(0, difference[0]) + codes[k].substring(difference[0] + 1);
                }
            }
        }
        return "No single difference found!";
    },

    readFile: function(){
        return fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
    },

    quickSort: function(array, start, end){
        let pivot;
        if(start < end){
            // Partition the array into two halves
            pivot = this.partition(array, start, end);

            // QuickSort the first half
            this.quickSort(array, start, pivot - 1);

            // QuickSort the second half
            this.quickSort(array, pivot + 1, end);
        }
    },

    partition: function(array, start, end){
        let mid = Math.floor((start + end) / 2);

        // Swap the first value with the middle value
        this.swap(array, start, mid);
        let pivot = start;
        let pivotValue = array[start];

        // Values less than the pivot value go before the pivot
        // Values greater than the pivot value go after the pivot
        for(let scan = start + 1; scan <= end; scan++){
            if(array[scan] < pivotValue){
                pivot++;
                this.swap(array, pivot, scan);
            }
        }
        
        // Move the pivot back to the middle
        this.swap(array, start, pivot);
        return pivot;
    },

    swap: function(array, val1, val2){
        // Swap two values
        let temp = array[val1];
        array[val1] = array[val2];
        array[val2] = temp;
    },

    difference: function(string1, string2){
        // Compare each letter in the string
        // Store indices with differences in an array
        let difference = [];
        for(var letter = 0; letter < string1.length; letter++){
            if(string1[letter] != string2[letter])
                difference.push(letter);
        }
        return difference;
    },

    // Function to test the output of this.quickSort()
    quickSortTest: function(array){
        this.quickSort(array, 0, array.length - 1);
        return array;
    },

}

export default Solution;