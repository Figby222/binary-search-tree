import Tree from './modules/tree.js'
import { buildTree, balanceTree } from './modules/tree.js';
// console.log(mergeSort([24, 12, 51, 33, 22, 1, 35, 21]));

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const myTree = new Tree([24, 12, 51, 33, 22, 1, 35, 21]);

prettyPrint(myTree.root);
myTree.insert(222);
prettyPrint(myTree.root);
myTree.insert(42);
prettyPrint(myTree.root);
myTree.insert(25);
prettyPrint(myTree.root);
myTree.deleteItem(myTree.root, 1);
prettyPrint(myTree.root);
myTree.deleteItem(myTree.root, 222);
prettyPrint(myTree.root);
myTree.deleteItem(myTree.root, 33);
prettyPrint(myTree.root);