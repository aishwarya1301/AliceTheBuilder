import Move from "../Move";

test('constructor sets correct "to" value', () => {
  const move = new Move(1, 2);
  expect(move.to).toBe(2);
});

test('constructor sets correct "from" value', () => {
  const move = new Move(1, 2);
  expect(move.from).toBe(1);
});

test("invert from->to", () => {
  const move = new Move(1, 2);
  expect(move.invert().to).toBe(1);
});

test("invert to->from", () => {
  const move = new Move(1, 2);
  expect(move.invert().from).toBe(2);
});
