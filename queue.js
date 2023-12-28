class Queue {
  arr = [];

  enque(value) {
    return this.arr.push(value);
  }

  deque() {
    return this.arr.shift();
  } //앞에 요소부터 제거

  peek() {
    return this.arr[0];
  } //첫번째 요소

  get length() {
    return this.arr.length;
  }
}

const queue = new Queue();
queue.enque(1);
queue.enque(3);
queue.enque(5);
queue.enque(2);
queue.enque(4);
console.log(queue.length);
console.log(queue.peek());
console.log(queue.deque());
console.log(queue);
