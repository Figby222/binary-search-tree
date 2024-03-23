import Tree from './modules/tree.js'
import { buildTree, balanceTree } from './modules/tree.js';
// console.log(mergeSort([24, 12, 51, 33, 22, 1, 35, 21]));

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightNode !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
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
myTree.deleteItem(51);