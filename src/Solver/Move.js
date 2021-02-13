class Move {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  invert() {
    return new Move(this.to, this.from);
  }
}

export default Move;
