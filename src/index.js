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
console.log("1 deleted");
prettyPrint(myTree.root);
myTree.deleteItem(myTree.root, 222);
console.log("222 deleted");
prettyPrint(myTree.root);
myTree.deleteItem(myTree.root, 33);
console.log("33 deleted");
prettyPrint(myTree.root);
myTree.deleteItem(myTree.root, 22);
console.log("22 deleted");
prettyPrint(myTree.root);
console.log(myTree.find(myTree.root, 35));
console.log(myTree.find(myTree.root, 24));

debugger;
// myTree.levelOrder(myTree.root);
myTree.inOrder(myTree.root);