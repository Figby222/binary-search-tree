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
    
    // if (root.left != null && value == root.left.data) { // 1 child, left target
    //     let parent = root.left;
    //     if (parent.left) {
    //         parent = parent.left
    //     } else if (parent.right) {
    //         parent = parent.right
    //     } else {
    //         parent = null;
    //     }
    //     root.left = parent;
    // } else if (root.right != null && value == root.right.data) { // 1 child, right
    //     let parent = root.right;
    //     if (parent.left) {
    //         parent = parent.left;
    //     } else if (parent.right) {
    //         parent = parent.right;
    //     } else {
    //         parent = null;
    //     }
    //     root.right = parent;

    // } else if (value < root.data) {
    //     return this.deleteItem(root.left, value);
    // } else if (value > root.data) {
    //     return this.deleteItem(root.right, value);
    // }

    // 2 children
    if (root.data == null) {
        return null;
    }
    
    let target;
    while (!target) {
        if (root.left && value == root.left.data) {
            target = root.left;
        } else if (root.right && value == root.right.data) {
            target = root.right;
        } else if (value < root.data) {
            root = root.left;
        } else if (value > root.data) {
            root = root.right
        } else if (value == root.data) {
            target = root;
            // do something
        }
    }

    const nextSmallest = this.getSmallest(target.right);
    if(!(nextSmallest)) { // if !(target.right.left)
        // there is one child or no children
        if (target.right) {
            // set root.right or .left to target.right
            if (root.right == target) { //target is right from root
                root.right = target.right;
            } else { // target is left from root
                root.left = target.right;
            }
        } else {
            // set root.right or .left to null
            if (root.right == target) { //target is right from root
                root.right = null;
            } else { // target is left from root
                root.left = null;
            }
        }

        return;
    }

    target.data = nextSmallest.data;

    this.deleteItem(this.root, nextSmallest.data);

    // if (nextSmallest.right) { // smallest has a child
    //     nextSmallest = nextSmallest.right;
    // } else { // smallest has no children
    //     nextSmallest = null;
    // }

}

Tree.prototype.getSmallest = function(root) {
    if (!Object.hasOwnProperty(root, "left")) {
        return root;
    }

    return getSmallest(root.left);
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