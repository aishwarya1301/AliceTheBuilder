import Board from "../Board";
import Move from "../Move";
import { createGlass } from "./testUtils";

const testBoard = new Board([
  createGlass([1, 1, 1]),
  createGlass([2, 2, 2]),
  createGlass([3, 3, 3]),
  createGlass([1, 2, 3]),
  createGlass([]),
]);

test("clone creates a hard copy", () => {
  const board = testBoard.clone();
  expect(board).not.toBe(testBoard);
});

test("isComplete to return false when not finished", () => {
  const board = testBoard.clone();
  expect(board.isComplete()).toBe(false);
});

test("isComplete to return true when solved", () => {
  const board = new Board([
    createGlass([1, 1, 1, 1]),
    createGlass([2, 2, 2, 2]),
    createGlass([3, 3, 3, 3]),
    createGlass([]),
    createGlass([]),
  ]);
  expect(board.isComplete()).toBe(true);
});

test("calculateAllPotentialMoves returns all valid moves", () => {
  const board = new Board([
    createGlass([1, 1, 1]),
    createGlass([2, 2, 2]),
    createGlass([3, 3, 3]),
    createGlass([1, 2, 3]),
    createGlass([]),
  ]);
  const moves = board.calculateAllPotentialMoves();
  const expectedMoves = [
    new Move(0, 4),
    new Move(1, 4),
    new Move(2, 4),
    new Move(3, 4),
    new Move(2, 3),
    new Move(3, 2),
  ];
  expect(new Set(moves)).toEqual(new Set(expectedMoves));
});

test("isGlassComplete returns true when glass is full and consist of a single color", () => {
  const board = new Board([
    createGlass([1, 1, 1, 1]),
    createGlass([2, 2, 3, 3]),
    createGlass([3, 3, 2, 2]),
    createGlass([]),
    createGlass([]),
  ]);
  expect(board.isGlassComplete(0)).toBe(true);
});

test("getGlasses returns a uncloned reference to glasses", () => {
  const glasses = [
    createGlass([1, 1, 1, 1]),
    createGlass([2, 2, 3, 3]),
    createGlass([3, 3, 2, 2]),
    createGlass([]),
    createGlass([]),
  ];
  const board = new Board(glasses);
  expect(board.getGlasses()).toBe(glasses);
});

test("isGlassComplete returns false when glass is NOT full and consist of a single color", () => {
  const board = new Board([
    createGlass([1, 1, 1, 1]),
    createGlass([2, 2, 3, 3]),
    createGlass([3, 3, 2, 2]),
    createGlass([]),
    createGlass([]),
  ]);
  expect(board.isGlassComplete(1)).toBe(false);
});

test("moveBall mutates board in place", () => {
  const board = new Board([
    createGlass([1, 1, 1]),
    createGlass([2, 2, 2]),
    createGlass([3, 3, 3]),
    createGlass([1, 2, 3]),
    createGlass([]),
  ]);
  board.moveBall(new Move(3, 4));
  expect(board.toString()).toMatchInlineSnapshot(`
    "1,1,1
    2,2,2
    3,3,3
    1,2
    3
    "
  `);
});
