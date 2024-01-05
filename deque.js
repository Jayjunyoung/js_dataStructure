class Deque {
  //스택과 큐의 짬뽕 버전임
  arr = [];

  push(value) {
    return this.arr.push(value);
  }

  unshift(value) {
    return this.arr.unshift(value);
  }

  pop() {
    return this.arr.pop();
  }

  shift() {
    return this.arr.shift();
  }

  peek() {
    return this.arr.at(0);
  }

  get length() {
    return this.arr.length;
  }
}

const deque = new Deque();
deque.push(1);
deque.push(3);
deque.push(5);
deque.unshift(2);
deque.unshift(4); // 5
// 4, 2, 1, 3, 5
console.log(deque.length); // 5
deque.pop(); // 5
deque.shift(); // 4
console.log(deque.peek()); // 2;
