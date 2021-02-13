import autoBind from "auto-bind";
import Stack from "./Stack";

class Glass {
  constructor(capac) {
    this.capacity = capac;
    this.stack = new Stack();
    autoBind(this);
  }

  getCapacity() {
    return this.capacity;
  }

  isEmpty() {
    return this.stack.isEmpty();
  }

  isFull() {
    // console.log("is Full func stack size: ", this.stack.size(), this.capacity, this.stack.size()==this.capacity)
    return this.stack.size() == this.capacity;
  }

  top() {
    return this.stack.top();
  }

  pop() {
    return this.stack.pop();
  }

  push(ball) {
    if (this.isFull()) {
      throw Error("Can't push to a full glass");
    }
    this.stack.push(ball);
  }

  size() {
    return this.stack.size();
  }

  hasOnlySingleColorBalls() {
    const balls = this.getAllBalls();
    for (let i = 1; i < balls.length; i += 1) {
      if (balls[i - 1] !== balls[i]) {
        return false;
      }
    }
    return true;
  }

  pushArrayOfBalls(balls) {
    const isExeedingCapacity = balls.length + this.stack.size() > this.capacity;
    if (isExeedingCapacity) {
      throw Error("pushArrayOfBalls can't exceed glass capacity");
    }
    balls.forEach(this.push);
  }

  getAllBalls() {
    const balls = [];
    while (!this.isEmpty()) {
      balls.push(this.pop());
    }
    balls.reverse();
    this.pushArrayOfBalls(balls);
    return balls;
  }

  clone() {
    const newGlass = new Glass(this.capacity);
    newGlass.pushArrayOfBalls(this.getAllBalls());
    return newGlass;
  }

  toString() {
    return this.getAllBalls().join(",");
  }
}

export default Glass;
