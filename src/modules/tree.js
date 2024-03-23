import mergeSort from './modules/merge-sort.js'

const Tree = function(array) {
    return {
        root: buildTree(array),
    }
}

function buildTree(array) {
    const sortedArray = mergeSort(array);

    const root = balanceTree(sortedArray);

    return root;
}

export default Tree;