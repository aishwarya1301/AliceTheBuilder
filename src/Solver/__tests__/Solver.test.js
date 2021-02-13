import Board from "../Board";
import Solver from "../Solver";
import { createGlass, doesMovesSolveTheBoard } from "./testUtils";

const SIMPLE_TIMEOUT_IN_MS = 10;
const COMPLEX_TIMEOUT_IN_MS = 500;

test(
  "handles board impossible to solve",
  () => {
    const board = new Board([
      createGlass([2, 1, 1, 1]),
      createGlass([2]),
      createGlass([2]),
      createGlass([2]),
    ]);
    const report = Solver(board);
    expect(report.isSolvable).toBe(false);
  },
  SIMPLE_TIMEOUT_IN_MS
);

test(
  "is able to find solution to simple board",
  () => {
    const board = new Board([
      createGlass([2, 1, 1, 1]),
      createGlass([2, 2, 2]),
      createGlass([1]),
      createGlass([]),
    ]);
    const report = Solver(board);
    expect(report.isSolvable).toBe(true);
  },
  SIMPLE_TIMEOUT_IN_MS
);

test(
  "gives moves to solve the board",
  () => {
    const board = new Board([
      createGlass([2, 1, 1, 1]),
      createGlass([2, 2, 2]),
      createGlass([1]),
      createGlass([]),
    ]);
    const report = Solver(board);
    const isSolvable = doesMovesSolveTheBoard(board, report.moves);
    expect(isSolvable).toBe(true);
  },
  SIMPLE_TIMEOUT_IN_MS
);

test(
  "is able to provide moves to solve complex board",
  () => {
    const board = new Board([
      createGlass([0, 1, 0, 2]),
      createGlass([1, 3, 4, 2]),
      createGlass([5, 6, 4, 4]),
      createGlass([7, 6, 3, 6]),
      createGlass([8, 5, 7, 7]),
      createGlass([0, 5, 5, 1]),
      createGlass([3, 3, 2, 0]),
      createGlass([4, 6, 8, 8]),
      createGlass([7, 2, 8, 1]),
      createGlass([]),
      createGlass([]),
    ]);
    const report = Solver(board);
    const isSolvable = doesMovesSolveTheBoard(board, report.moves);
    expect(isSolvable).toBe(true);
  },
  COMPLEX_TIMEOUT_IN_MS
);
