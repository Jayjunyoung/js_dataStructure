class Tree {
  constructor(value) {
    this.root = new Node(value);
  }
} //root에 Node 값 초기화

class Node {
  children = [];

  constructor(value) {
    this.value = value;
  }

  push(value) {
    this.children.push(new Node(value));
  }
}

const tree = new Tree(50);
console.log(tree.root.value); //50 확인
tree.root.push(25);
tree.root.push(75);
tree.root.children[0].push(12);
tree.root.children[0].push(22);
tree.root.children[1].push(33);
tree.root.children[1].push(17);
tree.root.children[1].push(27);
console.log(tree.root.children[0]);
console.log(tree.root.children[1]);
