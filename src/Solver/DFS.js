import autoBind from "auto-bind";
import Stack from "./Stack";

class DFS {
  // startNode needs to implement AbstractGraphNode
  constructor(startNode) {
    this.visited = new Set();
    this.visited.add(startNode.getHash());

    this.stack = new Stack();
    this.stack.push(startNode);

    autoBind(this);
  }

  isDone() {
    return this.stack.isEmpty();
  }

  currentNode() {
    return this.stack.top();
  }

  iterate() {
    const { stack, visited } = this;
    const node = stack.pop();

    const neighbors = node.getNeighbors();
    neighbors.forEach((neighbor) => {
      const neighborHash = neighbor.getHash();
      if (!visited.has(neighborHash)) {
        stack.push(neighbor);
        visited.add(neighborHash);
      }
    });
  }
}

export default DFS;
