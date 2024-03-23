import mergeSort from './merge-sort.js';
import Node from './node.js';

const Tree = function(array) {
    this.root = buildTree(array);
    
}

Tree.prototype.insert = function(value) {
    const node = new Node(value);
    let rootNode = this.root;
    while(true) {
        if (node.data < rootNode.data) { // should go left
            if (rootNode.left === null) {
                rootNode.left = node;
                return;
            }

            rootNode = rootNode.left;
        } else if (node.data > rootNode.data) { // should go right
            if (rootNode.right === null) {
                rootNode.right = node;
                return;
            }
            rootNode = rootNode.right;
        } else { // they're even
            return; // no duplicates
        }

    }

}

Tree.prototype.deleteItem = function(value) {
    debugger;

    function recursion(root) {
        if (root.left != null && value == root.left.data) {
            root.left = null;
        } else if (root.right != null && value == root.right.data) {
            root.right = null;
        } else if (root.data == null) {
            return;
        } else if (value < root.data) {
            return recursion(root.left);
        } else if (value > root.data) {
            return recursion(root.right);
        }
    } 

    recursion(this.root);
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

    node.left = balanceTree(array.slice(0, mid));
    node.right = balanceTree(array.slice(mid + 1));

    return node;
}

export { buildTree, balanceTree };
export default Tree;