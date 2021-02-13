import DFS from "./DFS";
import AbstractGraphNode from "./AbstractGraphNode";

class GraphNode extends AbstractGraphNode {
  constructor(board, previousMove, previousNode) {
    super();
    this.board = board;
    this.previousMove = previousMove;
    this.previousNode = previousNode;
  }

  getHash() {
    const glasses = this.board.getGlasses();
    const glassStrings = glasses.map((glass) => glass.toString());
    glassStrings.sort();
    return glassStrings.join(";");
  }

  getNeighbors() {
    const { board } = this;
    const neighbors = board
      .calculateAllPotentialMoves()
      .filter((move) => !board.isGlassComplete(move.from))
      .filter((move) => {
        const fromGlass = board.getGlasses()[move.from];
        return !(fromGlass.size() === 3 && fromGlass.hasOnlySingleColorBalls());
      })
      .map((move) => {
        const newBoard = board.clone();
        newBoard.moveBall(move);
        return new GraphNode(newBoard, move, this);
      });
    return neighbors;
  }

  getBoard() {
    return this.board;
  }

  getMovesToNode() {
    const moves = [];
    if (this.previousNode !== null) {
      moves.push(...this.previousNode.getMovesToNode());
    }
    if (this.previousMove !== null) {
      moves.push(this.previousMove);
    }
    return moves;
  }
}

function Solver(board) {
  const startNode = new GraphNode(board, null, null);
  const dfs = new DFS(startNode);

  while (!dfs.isDone()) {
    const currentNode = dfs.currentNode();

    const isSolved = currentNode.getBoard().isComplete();
    if (isSolved) {
      const moves = currentNode.getMovesToNode();
      return {
        isSolvable: true,
        moves,
      };
    }

    dfs.iterate();
  }

  return {
    isSolvable: false,
    moves: [],
  };
}

export default Solver;
