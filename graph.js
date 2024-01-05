class Graph {
  vertices = [];
  matrix = [];

  insertVertex(name) {
    this.vertices.push(new Vertex(name));
    this.matrix.push([]);
  }

  #searchVertex(name) {
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i].name == name) {
        return i;
      }
    }
    return null;
  }

  //안보고 구현해보기
  insertArc(from, to, value, capacity) {
    const fromV = this.#searchVertex(from);
    const toV = this.#searchVertex(to);
    //0인 경우에도 대입이 되도록 해야함
    if (fromV === null || toV === null) {
      throw "찾는 버텍스가 없습니다.";
    }
    this.matrix[fromV][toV] = new Arc(value, capacity);
  }
}

class Vertex {
  constructor(name) {
    this.name = name;
  }
}

class Arc {
  //value: 값, capacity: 허용량, 수도관을 생각해보기
  constructor(value, capacity) {
    this.value = value;
    this.capacity = capacity;
  }
}

const g = new Graph();
g.insertVertex("a");
g.insertVertex("b");
g.insertVertex("c");
g.insertArc("a", "b", 3);
g.insertArc("a", "c", 2);
g.insertArc("c", "a", 4);
g.insertArc("b", "c", 1);
g;
console.log(g.matrix);
