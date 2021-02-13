import Glass from "../Glass";

test("empty glass -> isEmpty = true", () => {
  const glass = new Glass();
  expect(glass.isEmpty()).toBe(true);
});

test("push a single ball will resolve in non-empty glass", () => {
  const glass = new Glass();
  glass.push(0);
  expect(glass.isEmpty()).toBe(false);
});

test("throw when call push on a full glass", () => {
  const glass = new Glass();
  for (let i = 0; i < glass.getCapacity(); i += 1) {
    glass.push(0);
  }
  expect(() => {
    glass.push(0);
  }).toThrow();
});

test("empty glass -> isFull = false", () => {
  const glass = new Glass();
  expect(glass.isFull()).toBe(false);
});

test("full glass -> isFull = true", () => {
  const glass = new Glass();
  for (let i = 0; i < glass.getCapacity(); i += 1) {
    glass.push(0);
  }
  expect(glass.isFull()).toBe(true);
});

test("size returns number of balls in the glass", () => {
  const glass = new Glass();
  glass.push(0);
  glass.push(1);
  expect(glass.size()).toBe(2);
});

test("call top on empty glass throws an exception", () => {
  const glass = new Glass();
  expect(() => {
    glass.top();
  }).toThrow();
});

test("top returns the top value", () => {
  const glass = new Glass();
  glass.push(0);
  glass.push(1);
  expect(glass.top()).toBe(1);
});

test("pop empty glass throws an exception", () => {
  const glass = new Glass();
  expect(() => {
    glass.pop();
  }).toThrow();
});

test("pop returns the top value", () => {
  const glass = new Glass();
  glass.push(0);
  glass.push(1);
  expect(glass.pop()).toBe(1);
});

test("pop removes the top value", () => {
  const glass = new Glass();
  glass.push(0);
  glass.push(1);
  glass.pop();
  expect(glass.pop()).toBe(0);
});

test("hasOnlySingleColorBalls return true when glass consist of single ball type", () => {
  const glass = new Glass();
  glass.push(0);
  glass.push(0);
  expect(glass.hasOnlySingleColorBalls()).toBe(true);
});

test("hasOnlySingleColorBalls return false when glass consist of multiple ball types", () => {
  const glass = new Glass();
  glass.push(0);
  glass.push(1);
  expect(glass.hasOnlySingleColorBalls()).toBe(false);
});

test("pushArrayOfBalls results in correct top ball", () => {
  const glass = new Glass();
  glass.pushArrayOfBalls([0, 1, 2, 3]);
  expect(glass.top()).toBe(3);
});

test("throw when call pushArrayOfBalls that will exceed the capacity", () => {
  const glass = new Glass();
  const ballsToPush = [];
  for (let i = 0; i <= glass.getCapacity(); i += 1) {
    ballsToPush.push(0);
  }
  expect(() => {
    glass.pushArrayOfBalls(ballsToPush);
  }).toThrow();
});

test("when pushArrayOfBalls fails due to exceeding the capacity then make it transactional", () => {
  expect.assertions(1);
  const glass = new Glass();
  const ballsToPush = [];
  for (let i = 0; i <= glass.getCapacity(); i += 1) {
    ballsToPush.push(0);
  }
  try {
    glass.pushArrayOfBalls(ballsToPush);
  } catch {
    expect(glass.isEmpty()).toBe(true);
  }
});

test("getAllBalls returns array of balls in correct order", () => {
  const glass = new Glass();
  glass.push(0);
  glass.push(1);
  glass.push(2);
  expect(glass.getAllBalls()).toEqual([0, 1, 2]);
});

test("clone glass copies all the balls", () => {
  const glass = new Glass();
  glass.pushArrayOfBalls([1, 2, 3]);
  const clonedGlass = glass.clone();
  expect(clonedGlass.getAllBalls()).toEqual([1, 2, 3]);
});

test("clone is a hard copy", () => {
  const glass = new Glass();
  const clonedGlass = glass.clone();
  glass.push(1);
  expect(glass.isEmpty()).not.toBe(clonedGlass.isEmpty());
});

test("toString returns all balls", () => {
  const glass = new Glass();
  glass.pushArrayOfBalls([1, 2, 3]);
  expect(glass.toString()).toEqual("1,2,3");
});
