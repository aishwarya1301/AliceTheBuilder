/* eslint-disable class-methods-use-this */
class AbstractGraphNode {
  getHash() {
    throw Error("Not implemented");
  }

  getNeighbors() {
    throw Error("Not implemented");
  }
}

export default AbstractGraphNode;
