import Glass from "../Glass";

export function createGlass(balls) {
  const glass = new Glass(settings["numFloors"]);
  glass.pushArrayOfBalls(balls);
  return glass;
}

export function doesMovesSolveTheBoard(board, moves) {
  const clonedBoard = board.clone();
  moves.forEach(clonedBoard.moveBall);
  return clonedBoard.isComplete();
}

// jest requires minimum one test in each file
test.skip("skip", () => {});
