class linkedList {
  length = 0; //생성자 생략 버전//연결리스트첨엔 길이가 0일것
  head = null;

  add(value) {
    //삽입 함수
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new Node(value);
    } else {
      this.head = new Node(value);
    }
    this.length++;
    return this.length;
  }

  search(index) {
    //이게 젤 어렵네
    this.#search(index[1])?.value;
  }

  #search(index) {
    let count = 0;
    let prev;
    let current = this.head;
    while (count < index) {
      prev = current;
      current = current?.next;
      count++;
    }
    return [prev, current];
  }

  delete(index) {
    //구조분해 할당 사용
    const [prev, current] = this.#search(index);
    if (prev && current) {
      prev.next = current.next;
      this.length--;
      return this.length;
    } else if (current) {
      this.head = current.next;
      return this.length;
    } else {
      return undefined;
    }
  }
}

class Node {
  next = null;
  constructor(value) {
    this.value = value;
  }
}

const ll = new linkedList();
ll.length;

ll.add(1);
ll.add(2);
ll.add(3);
ll.add(4);
ll.add(5);
ll.add(6);
console.log(ll.search(6));
ll.delete(4);
console.log(ll.search(4));
ll.delete(4);
console.log(ll.search(4));
console.log(ll.delete(4));
console.log("hi");
