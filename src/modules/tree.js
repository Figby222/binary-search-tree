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


    if(target.left == null && target.right == null) { // there are no children
        if (root.right != null && target == root.right) {
            root.right = null;
        } else if (root.left != null && target == root.left) {
            root.left = null;
        }
        return;
    }

    
    if (target.left == null && target.right != null) {
        // set root.right or .left to target.right
        if (root.right == target) { //target is right from root
            root.right = target.right;
        } else { // target is left from root
            root.left = target.right;
        }
        return;
    } else if (target.left != null && target.right == null) {
        // set root.right or .left to null
        if (root.right == target) { //target is right from root
            root.right = target.left;
        } else { // target is left from root
            root.left = target.left;
        }
        return;
    }

    const nextSmallest = this.getSmallest(target.right);

    this.deleteItem(this.root, nextSmallest.data);

    const temp = nextSmallest.data;

    target.data = temp;


    // if (nextSmallest.right) { // smallest has a child
    //     nextSmallest = nextSmallest.right;
    // } else { // smallest has no children
    //     nextSmallest = null;
    // }

}

Tree.prototype.getSmallest = function(root) {
    if (root.left == null) {
        return root;
    }

    return this.getSmallest(root.left);
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

Tree.prototype.find = function(root, value) {
    if (root == null) {
        return;
    }

    let data = false;

    data = this.find(root.left, value);
    if (root.data == value) {
        return root;
    }
    data = this.find(root.right, value);

    return data;
}

Tree.prototype.levelOrder = function(root = this.root, callback = levelOrderDefault) {
    let queue = [];
    queue.push(root);
    let current = 0;
    function recursion(current) {
        if (!queue[current]) {
            return;
        }

        if (queue[current].left != null) {
            queue.push(queue[current].left);
        }

        if (queue[current].right != null) {
            queue.push(queue[current].right);
        }

        recursion(current + 1);
    }

    recursion(current);
    queue.forEach((node) => callback(node));
    
}

function levelOrderDefault(node) {
    console.log(node.data);
}

Tree.prototype.inOrder = function(root = this.root, callback = levelOrderDefault) {
    let queue = []

    function recursion(current) {
        if (current == null) {
            return;
        }

        recursion(current.left);
        queue.push(current);
        recursion(current.right);
    }

    recursion(root);

    queue.forEach((node) => callback(node));
}

export { buildTree, balanceTree };
export default Tree;