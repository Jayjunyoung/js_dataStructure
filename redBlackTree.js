export class RedBlackTree {
  root = null;
  count = 0; //count를 이용해 트리의 갯수를 구해오는게 숙제

  #insert(node, value) {
    if (node.value > value) {
      //node의 value보다 삽입하고자 하는 value가 작은경우
      if (node.left) {
        this.#insert(node.left, value);
      } else {
        const newNode = new Node(value, "red");
        newNode.parent = node;
        node.left = newNode;
        return newNode;
      }
    } else {
      if (node.right) {
        this.#insert(node.right, value);
      } else {
        const newNode = new Node(value, "red");
        newNode.parent = node;
        node.right = newNode;
        return newNode;
      }
    }
  }

  insert(value) {
    //root가 있냐 없냐로 분기점을 따진다
    if (!this.root) {
      this.root = new Node(value, "black");
    } else {
      const newNode = this.#insert(this.root, value);
      this.#checkDoubleRed(newNode);
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
      //값을 찾았다면 그 값의 자식노드를 기준으로 바라본다.
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
        //부모의 왼팔에 합쳐지는 것
        node.left = this.#remove(node.left, value);
        return node;
      } else {
        //부모의 오른팔에 합쳐지는 것
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

  #checkDoubleRed(node) {
    if (node.color === "red" && node.parent.color === "red") {
      //삼촌의 색깔도 빨강이라면?ㄱrecolor, restructure 호출.. 삼촌이 아예 없다면
      if (node.getUncle().color === "red") {
        this.#reColor(node);
      } else if (node.getUncle().color === "black") {
        this.#reStructure(node);
      } else if (!node.getUncle()) {
        this.#reStructure(node);
      }
    }
  }

  #reColor(node) {
    if (node.parent) {
      node.parent.color = "black";
    }
    if (node.getUncle()) {
      node.getUncle().color = "black";
    }
    if (node.parent?.parent) {
      node.parent.parent.color = "red";
      if (node.parent.parent === this.root) {
        node.parent.parent.color = "black";
      }
    }
    this.#checkDoubleRed(node.parent?.parent);
  }

  #reStructure(node) {
    let middle;
    const grandgrandpa = node.parent.parent.parent;
    const grandpa = node.parent.parent;
    const parent = node.parent;
    if (node.value > grandpa.value) {
      if (node > node.parent.value) {
        middle = node.parent;
      } else {
        middle = node;
      }

      if (middle === node) {
        node.left = grandpa;
        grandpa.parent = node;
        node.right = parent;
        parent.parent = node;
        parent.left = null;
      } else {
        //부모가 가운데일 때
        grandpa.right = parent.left;
        grandpa.right.parent = grandpa;
        parent.left = grandpa;
        parent.left.parent = parent;
        parent.right = null;
      }
      if (grandgrandpa.left === grandpa) {
      }
    } else {
      if (node.value > node.parent.value) {
        middle = node.value;
      } else {
        middle = node.parent.value;
      }
    }
  }
}

class Node {
  left = null;
  right = null;
  parent = null;
  constructor(value, color = "red") {
    this.value = value;
    this.color = color;
  }

  //삼촌 찾기위한 메소드 생성
  getUncle() {
    if (this.parent?.parent.left === this.parent) {
      return this.parent?.parent.right;
    } else if (this.parent?.parent.right === this.parent) {
      return this.parent?.parent.left;
    }
  }
}

const rb = new RedBlackTree();

rb.insert(10); //b
rb.insert(5); //r->b
rb.insert(15); //r->b
rb.insert(3); //recolor 작동
rb;
