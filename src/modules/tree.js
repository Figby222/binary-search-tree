import mergeSort from './merge-sort.js';
import Node from './node.js';

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