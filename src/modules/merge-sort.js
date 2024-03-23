function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const arrayLeft = mergeSort(array.slice(0, array.length / 2));
    const arrayRight = mergeSort(array.slice(array.length / 2));

    const sortedArray = sortArrays(arrayLeft, arrayRight);

    return sortedArray;

}

function sortArrays(arrayLeft, arrayRight) {
    let leftI = 0;
    let rightI = 0;
    let sortedI = 0;
    let sortedArray = [];

    while(leftI < arrayLeft.length || rightI < arrayRight.length) {
        if (arrayLeft[leftI] < arrayRight[rightI] || rightI >= arrayRight.length) {
            sortedArray[sortedI] = arrayLeft[leftI];
            sortedI++;
            leftI++;
        } else if (arrayLeft[leftI] > arrayRight[rightI] || leftI >= arrayLeft.length) {
            sortedArray[sortedI] = arrayRight[rightI];
            sortedI++;
            leftI++;
        } else if (arrayLeft[leftI] === arrayRight[rightI]) {
            sortedArray[sortedI] = arrayLeft[leftI];
            leftI++;
            rightI++;
            sortedI++;
        } else {
            break;
        }
    }

    return sortedArray;
}

export default mergeSort;