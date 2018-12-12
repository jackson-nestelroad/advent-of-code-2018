'use strict';

const Algorithms = {
    // Yes, I know Array.prototype.sort() exists...
    mergeSort: function(array, left, right){
        if(left < right){
            let mid = Math.floor((left + right) / 2);
            this.mergeSort(array, left, mid);
            this.mergeSort(array, mid + 1, right);

            this.merge(array, left, mid, right);
        }
    },

    merge: function(array, left, mid, right){
        let i, j, k;
        let Left = [];
        let Right = [];
        let leftLength = mid - left + 1;
        let rightLength = right - mid;

        // Copy data to temporary arrays
        for(i = 0; i < leftLength; i++)
            Left[i] = array[left + i];
        for(j = 0; j < rightLength; j++)
            Right[j] = array[mid + j + 1];

        // Merge the temporary arrays back into array
        i = 0;
        j = 0;
        k = left;
        while(i < leftLength && j < rightLength){
            if(Left[i] <= Right[j])
                array[k++] = Left[i++];
            else
                array[k++] = Right[j++];
        }

        // Copy remaining elements of Left[]
        while(i < leftLength)
            array[k++] = Left[i++];

        // Copy remaining elements of Right[]
        while(j < rightLength)
            array[k++] = Right[j++];
    },

    // Insert into an array in numerical order
    orderedInsert: function(array, element){
        let first = 0;
        let last = array.length;
        while(last > first && element < array[last - 1])
        {
            array[last] = array[last - 1];
            last--;
        }
        array[last] = element;
        return last;
    },

    // Return an array of a range of numbers
    range: function(start = 0, end = 0, step = 1){
        if(start === end || step === 0)
            return [];
        let difference = end - start + 1;
        let length = Math.ceil(difference / step);
        return start > end
            ? Array.from({ length }, (value, key) => start - key * step)
            : Array.from({ length }, (value, key) => start + key * step);
    }
}

export default Algorithms;