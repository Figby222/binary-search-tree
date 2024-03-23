import Tree from './modules/tree.js'
import { buildTree, balanceTree } from './modules/tree.js';
// console.log(mergeSort([24, 12, 51, 33, 22, 1, 35, 21]));

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const node = buildTree([24, 12, 51, 33, 22, 1, 35, 21])

console.log(prettyPrint(node));