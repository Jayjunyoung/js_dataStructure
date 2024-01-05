class PriorityQueue {
  // 최대힙
  arr = [];

  #reheapUp(index) {
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.arr[index].priority > this.arr[parentIndex].priority) {
        // 값 바꾸기
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        this.#reheapUp(parentIndex);
      }
    }
  }

  insert(priority, value) {
    const index = this.arr.length;
    this.arr[index] = {
      priority,
      value,
    };
    this.#reheapUp(index);
  }

  #reheapDown(index) {
    const leftIndex = index * 2 + 1;
    if (leftIndex < this.arr.length) {
      const rightIndex = index * 2 + 2;
      //왼쪽 노드는 있지만 오른쪽 노드가 없는것을 보호위해 ? 대입
      const bigger =
        this.arr[leftIndex].priority > this.arr[rightIndex]?.priority
          ? leftIndex
          : rightIndex;
      if (this.arr[index]?.priority < this.arr[bigger]?.priority) {
        const temp = this.arr[index];
        this.arr[index] = this.arr[bigger];
        this.arr[bigger] = temp;
        this.#reheapDown(bigger);
      }
    }
  }

  remove() {
    // 루트 삭제
    if (this.arr.length === 0) {
      return false;
    }
    if (this.arr.length === 1) {
      return this.arr.pop();
    }
    const root = this.arr[0];
    //45를 78자리에 넣는것
    this.arr[0] = this.arr.pop();
    //다시 index 0부터 시작
    this.#reheapDown(0);
    return root;
  }

  sort() {
    // 힙 정렬
    const sortedArray = [];
    while (this.arr.length > 0) {
      sortedArray.push(this.remove());
    }
    return sortedArray;
  }

  search(value) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].value === value) {
        return i;
      }
    }
    return null;
  }

  update(value, newValue) {
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    this.arr[index].value = newValue;
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      // O(1/2n)
      //내부적으로 힙의 규칙을 맞춰주기 위한 함수 시작
      this.#heapify(i); // O(1)
    }
  }

  removeValue(value) {
    // 특정 값 삭제
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    this.arr.splice(index, 1);
    //leaf가 아닌 노드부터 루트까지의 반복문
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      // O(1/2n)
      this.#heapify(i); // O(1)
    }
  }

  #heapify(index) {
    //자식 노드 index구하고 더 큰 자식노드를 leaf가 아닌 노드의 값과 체인지
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;
    const bigger =
      (this.arr[leftIndex].parentIndex || 0) >
      (this.arr[rightIndex]?.priority || 0)
        ? leftIndex
        : rightIndex;
    //index, 해당 index의 값, 더 큰 인덱스의 값 출력
    console.log(index, this.arr[index], this.arr[bigger]);
    if (this.arr[index].priority < this.arr[bigger]?.priority) {
      const temp = this.arr[index];
      //큰 걸 집어 넣어줌
      this.arr[index] = this.arr[bigger];
      this.arr[bigger] = temp;
    }
  }
}

const pq = new PriorityQueue();
//insert될때 작은 순으로 들어가고 index별로 비교
pq.insert(6, "one");
pq.insert(5, "two");
pq.insert(4, "three");
pq.insert(3, "four");
pq.insert(2, "five");
pq.insert(1, "six");
pq.insert(10000, "king");
console.log(pq.remove()); //king이나올것
console.log(pq.remove());
pq;
