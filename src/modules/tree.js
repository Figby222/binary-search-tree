import mergeSort from './merge-sort.js';
import Node from './node.js';

const Tree = function(array) {
    return {
        root: buildTree(array),
        insert: function(value) {
            debugger;
            const node = new Node(value);
            let rootNode = this.root;
            while(true) {
                if (node.data < rootNode.data) { // should go left
                    if (rootNode.leftNode === null) {
                        rootNode.leftNode = node;
                        return;
                    }

                    rootNode = rootNode.leftNode;
                } else if (node.data > rootNode.data) { // should go right
                    if (rootNode.rightNode === null) {
                        rootNode.rightNode = node;
                        return;
                    }
                    rootNode = rootNode.rightNode;
                } else { // they're even
                    return; // no duplicates
                }

            }
        }
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
    node.rightNode = balanceTree(array.slice(mid + 1));

    return node;
}

export { buildTree, balanceTree };
export default Tree;