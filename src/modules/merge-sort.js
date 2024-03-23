function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const arrayLeft = mergeSort(array.slice(0, array.length() / 2));
    const arrayRight = mergeSort(array.slice(array.length() / 2));

    const sortedArray = sortArrays(arrayLeft, arrayRight);

    return sortedArray;

}

function sortArrays(arrayLeft, arrayRight) {
    
}

export default mergeSort;