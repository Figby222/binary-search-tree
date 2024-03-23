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

function balanceTree(array) {
    if (array.length <= 0) {
        return null;
    }

    const mid = Math.floor((array.length - 1) / 2);

    const node = new Node(array[mid]);

    node.leftNode = balanceTree(array.slice(0, mid));
    node.rightNode = balanceTree(array.slice(mid));

    return node;
}

export { buildTree, balanceTree };
export default Tree;