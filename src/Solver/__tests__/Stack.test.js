import Stack from "../Stack";

test("empty stack -> size = 0", () => {
  const stack = new Stack();
  expect(stack.size()).toBe(0);
});

test("return isEmpty=true on empty stack", () => {
  const stack = new Stack();
  expect(stack.isEmpty()).toBe(true);
});

test("push a single item will resolve in non-empty stack", () => {
  const stack = new Stack();
  stack.push(0);
  expect(stack.isEmpty()).toBe(false);
});

test("push a single item will resolve in size=1", () => {
  const stack = new Stack();
  stack.push(0);
  expect(stack.size()).toBe(1);
});

test("pop empty stack throws an exception", () => {
  const stack = new Stack();
  expect(() => {
    stack.pop();
  }).toThrow();
});

test("top on empty stack throws an exception", () => {
  const stack = new Stack();
  expect(() => {
    stack.top();
  }).toThrow();
});

test("top will return correct value", () => {
  const stack = new Stack();
  stack.push(0);
  stack.push(1);
  expect(stack.top()).toBe(1);
});

test("top will leave size unchanged", () => {
  const stack = new Stack();
  stack.push(0);
  stack.top();
  expect(stack.size()).toBe(1);
});

test("pop will reduce size by 1", () => {
  const stack = new Stack();
  stack.push(0);
  stack.push(1);
  stack.pop();
  expect(stack.size()).toBe(1);
});

test("pop will return the top value", () => {
  const stack = new Stack();
  stack.push(0);
  stack.push(1);
  expect(stack.pop()).toBe(1);
});

test("pop clears the top value", () => {
  const stack = new Stack();
  stack.push(0);
  stack.push(1);
  stack.pop();
  expect(stack.pop()).toBe(0);
});
