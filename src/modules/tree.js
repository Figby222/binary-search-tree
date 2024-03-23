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
    let rootNode = this.root;

    function recursion(rootNode = this.root) {
        if (!(rootNode.left) && (rootNode.right)) {
            if (rootNode.left.data == value) {
                
            } else {
                rootNode == rootNode.left;
                return recursion();
            }
        } else if ((rootNode.left) && !(rootNode.right)) {
            
        } else if (rootNode.left && rootNode.right) {

        } else {
            return;
        }
        // if (rootNode.left.data == value || rootNode.right.data == value) {
        //     return rootNode;
        // } else if (value < rootNode.data) {
        //     rootNode = rootNode.left;
        // } else if (value > rootNode.data) {
        //     rootNode = rootNode.right;
        // } else {
        //     return null;
        // }
    }

    recursion();
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