import mergeSort from './merge-sort.js';
import Node from './node.js';

const Tree = function(array) {
    this.root = this.buildTree(array);
    
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

Tree.prototype.deleteItem = function(value, root = this.root) {
    
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

    this.deleteItem(nextSmallest.data);

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

Tree.prototype.buildTree = function(array) {
    const sortedArray = mergeSort(array);

    const root = this.balanceTree(sortedArray);

    return root;
}

Tree.prototype.balanceTree = function(array) {
    if (array.length <= 0) {
        return null;
    }

    const mid = Math.floor((array.length - 1) / 2);

    const node = new Node(array[mid]);

    node.left = this.balanceTree(array.slice(0, mid));
    node.right = this.balanceTree(array.slice(mid + 1));

    return node;
}

Tree.prototype.find = function(value, root = this.root) {
    if (root == null) {
        return null;
    }

    let data = false;

    data = this.find(value, root.left);
    if (root.data == value) {
        return root;
    }
    data = this.find(value, root.right);

    return data;
}

Tree.prototype.levelOrder = function(root = this.root, callback = null) {
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

    if (callback == null) {
        console.log(queue);
        return;
    }

    queue.forEach((node) => {
        callback(node);
    })
    
}

function levelOrderDefault(node) {
    console.log(node.data);
}

Tree.prototype.inOrder = function(root = this.root, callback = null) {
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

    if (callback == null) {
        console.log(queue);
        return;
    }

    queue.forEach((node) => {
        callback(node);
    })
}

Tree.prototype.preOrder = function(root = this.root, callback = null) {
    let queue = [];

    function recursion(current) {
        if (current == null) {
            return;
        }

        queue.push(current);
        recursion(current.left);
        recursion(current.right);
    }

    recursion(root);

    if (callback == null) {
        console.log(queue);
        return;
    }

    queue.forEach((node) => {
        callback(node);
    })
}

Tree.prototype.postOrder = function(root = this.root, callback = null) {
    let queue = [];

    function recursion(current) {
        if (current == null) {
            return;
        }

        recursion(current.left);
        recursion(current.right);
        queue.push(current);
    }

    recursion(root);

    if (callback == null) {
        console.log(queue);
        return;
    }

    queue.forEach((node) => {
        callback(node);
    })
}

// make variables with default vals at end
Tree.prototype.height = function(current = this.root, currentHeight = 0) {
    if (current == null) {
        return;
    }

    let maxHeight = currentHeight;

    const left = this.height(current.left, currentHeight + 1)
    const right = this.height(current.right, currentHeight + 1)

    if (left > maxHeight) {
        maxHeight = left;
    }

    if (right > maxHeight) {
        maxHeight = right;
    }

    return maxHeight;
}

Tree.prototype.depth = function(value, current = this.root, currentDepth = 0) {
    if (current == null) {
        return null;
    }

    if (value == current.data) {
        return currentDepth;
    }

    if (value < current.data) {
        return this.depth(current.left, value, currentDepth + 1);
    }

    if (value > current.data) {
        return this.depth(current.right, value, currentDepth + 1);
    }

}

Tree.prototype.isBalanced = function() {
    let minHeight = 0;
    let maxHeight = 0;

    function recursion(current = this.root, currentHeight = 0) {
        if (current == null) {
            currentHeight -= 1;
            if (currentHeight < minHeight || !(minHeight)) {
                minHeight = currentHeight;
            }

            if (currentHeight > maxHeight) {
                maxHeight = currentHeight;
            }
            return;
        }

        recursion(current.left, currentHeight + 1);
        recursion(current.right, currentHeight + 1);

        // return currentHeight;
    }

    // function recursion2(current = this.root, currentHeight = 0) {
    //     if (current == null) {
    //         return;
    //     }

    //     const left = recursion2(current.left, currentHeight + 1);
    //     const right = recursion2(current.right, currentHeight + 1);

    //     if (currentHeight < minHeight || !(minHeight)) {
    //         minHeight = currentHeight;
    //     }

    //     if (currentHeight > maxHeight) {
    //         maxHeight = currentHeight;
    //     }

    //     return currentHeight;
    // }

    recursion(this.root);

    if (maxHeight - 1 > minHeight) { // if maxHeight is 2 or more greater than minHeight
        return false;
    }

    return true;
}

Tree.prototype.rebalance = function() {
    let dataList = [];

    function recursion(current = this.root) {
        if (current == null) {
            return;
        }

        recursion(current.left)
        dataList.push(current.data);
        recursion(current.right);

    }

    recursion(this.root);

    this.root = this.buildTree(dataList);
}


export default Tree;