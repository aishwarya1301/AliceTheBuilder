/* eslint-disable max-classes-per-file */
import autoBind from "auto-bind";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
    autoBind(this);
  }

  getValue() {
    return this.value;
  }

  getNext() {
    return this.next;
  }

  setNext(next) {
    this.next = next;
    return this;
  }

  getPrevious() {
    return this.previous;
  }

  setPrevious(previous) {
    this.previous = previous;
    return this;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.internalSize = 0;
    autoBind(this);
  }

  push(value) {
    const node = new Node(value);
    node.setNext(this.last);
    if (this.first === null) {
      this.first = node;
    } else {
      this.last.setPrevious(node);
    }
    this.last = node;
    this.internalSize += 1;
  }

  top() {
    return this.first.getValue();
  }

  pop() {
    // assert(this.first !== null);
    const { first } = this;
    this.first = first.getPrevious();
    this.internalSize -= 1;
    return first.getValue();
  }

  isEmpty() {
    return this.first === null;
  }

  size() {
    return this.internalSize;
  }
}

export default Queue;
