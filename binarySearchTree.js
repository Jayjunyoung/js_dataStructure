export class BinarySearchTree {
  root = null;
  count = 0; //count를 이용해 트리의 갯수를 구해오는게 숙제

  #insert(node, value) {
    if (node.value > value) {
      //node의 value보다 삽입하고자 하는 value가 작은경우
      if (node.left) {
        this.#insert(node.left, value);
      } else {
        node.left = new Node(value);
      }
    } else {
      if (node.right) {
        this.#insert(node.value, value);
      } else {
        node.right = new Node(value);
      }
    }
  }

  insert(value) {
    //root가 있냐 없냐로 분기점을 따진다
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.#insert(this.root, value);
    }
  }

  //node의 left부터 재귀함수
  #search(node, value) {
    if (node.value > value) {
      if (!node.left) {
        return null;
      }

      if (node.left.value == value) {
        return node.left;
      }

      return this.#search(node.left, value);
    } else {
      if (!node.right) {
        return null;
      }

      if (node.right.value == value) {
        return node.right;
      }

      return this.#search(this.right, value);
    }
  }

  search(value) {
    if (!this.root) {
      return null;
    }

    //this.root가 있으면서 root의 값과 찾고자 하는 value가 값다면
    if (this.root.value == value) {
      return this.root;
    }

    //root부터 재귀함수 발동
    return this.#search(this.root, value);
  }

  #remove(node, value) {
    if (!node) {
      // 제거할 값이 bst에 존재하지 않는 경우
      return null; // 지울 값이 존재 안 하면 false return
    }
    if (node.value === value) {
      // 자식 입장
      // 지울 값을 찾은 경우
      if (!node.left && !node.right) {
        // leaf
        return null;
      } else if (!node.left) {
        // 왼팔만 없는 경우
        return node.right;
      } else if (!node.right) {
        // 오른팔만 없는 경우
        return node.left;
      } else {
        // 양팔 다 있는 경우
        let exchange = node.left;
        while (exchange.right) {
          exchange = exchange.right;
        }
        //while문을 돌며 exchange값이 왼쪽에서 가장 오른쪽에 있는 값으로 바뀜
        const temp = node.value;
        node.value = exchange.value;
        exchange.value = temp;
        node.left = this.#remove(node.left, temp); //
        return node;
      }
    } else {
      // 부모 입장
      if (node.value > value) {
        node.left = this.#remove(node.left, value);
        return node;
      } else {
        node.right = this.#remove(node.right, value);
        return node;
      }
    }
  }
  remove(value) {
    // 1. leaf(양팔 다 없음) -> 제거
    // 2. leaf x, 왼팔이 없다 -> 오른팔 끌어올린다
    // 3. leaf x, 오른팔이 없다 -> 왼팔 끌어올린다
    // 4. leaf x, 양팔 다 있다 -> 왼팔에서 가장 큰 애와 바꾼다,leaf를 지운다
    this.root = this.#remove(this.root, value);
    return; // 숙제로 length return하게
  }
}

class Node {
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }
}

const bst = new BinarySearchTree();
bst.insert(8);
bst.insert(10);
bst.insert(3);
bst.insert(1);
bst.insert(14);
bst.insert(6);
bst.insert(7);
bst.insert(4);
bst.insert(13);
bst.count; //9나오도록 구현 해라
