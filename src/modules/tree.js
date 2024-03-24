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

Tree.prototype.deleteItem = function(root = this.root, value) {
    debugger;
    if (root.data == null) {
        return null;
    }
    if (root.left != null && value == root.left.data) { // 1 child, left target
        let parent = root.left;
        if (parent.left) {
            parent = parent.left
        } else if (parent.right) {
            parent = parent.right
        } else {
            parent = null;
        }
        root.left = parent;
    } else if (root.right != null && value == root.right.data) { // 1 child, right
        let parent = root.right;
        if (parent.left) {
            parent = parent.left;
        } else if (parent.right) {
            parent = parent.right;
        } else {
            parent = null;
        }
        root.right = parent;

    } else if (value < root.data) {
        return this.deleteItem(root.left, value);
    } else if (value > root.data) {
        return this.deleteItem(root.right, value);
    }
}

function getSecondSmallest(root) {
    if (root.left == null) {
        return false;
    }

    if (root.left.left == null) {
        return root;
    }

    return getSecondSmallest(root.left);
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