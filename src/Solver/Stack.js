/* eslint-disable max-classes-per-file */
import autoBind from "auto-bind";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
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
}

class Stack {
  constructor() {
    this.next = null;
    this.internalSize = 0;
    autoBind(this);
  }

  push(value) {
    const node = new Node(value);
    node.setNext(this.next);
    this.next = node;
    this.internalSize += 1;
  }

  top() {
    // assert(this.next !== null);
    return this.next.getValue();
  }

  pop() {
    // assert(this.next !== null);
    const { next } = this;
    this.next = next.getNext();
    this.internalSize -= 1;
    return next.getValue();
  }

  isEmpty() {
    return this.next === null;
  }

  size() {
    return this.internalSize;
  }
}

export default Stack;
