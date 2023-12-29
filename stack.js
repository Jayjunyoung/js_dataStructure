class Stack {
  arr = [];

  push(value) {
    return this.arr.push(value);
  }

  pop() {
    return this.arr.pop();
  }

  top() {
    return this.arr.at(-1);
  }

  get length() {
    return this.arr.length;
  } //클래스 개념: getter -> 값을 반환함
}

const stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(5);
stack.push(2);
stack.push(4);
console.log(stack.length);
console.log(stack.top());
console.log(stack);
