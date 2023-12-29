class BinarySearchTree {
  root = null;

  #insert(node, value) {}

  insert(value) {
    if (!this.root) {
      //루트에 값이 없다면 새로운 노드의 값을 넣는다
      this.root = new Node(value);
    } else if (this.root.value > value) {
      //root의 value보다 값이 작다면
      this.#insert(this.root.left, value);
    } else {
      //root의 value보다 값이 크다면
      this.#insert(this.root.right, value);
    }
  }

  search(value) {}

  delete(value) {}
}

class Node {
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }
}
