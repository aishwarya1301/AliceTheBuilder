import DFS from "../DFS";

function generateNode(id, children) {
  return {
    getHash: () => id,
    getNeighbors: () => children,
  };
}

test("isDone returns falsy when not completed", () => {
  const node = generateNode(0, []);
  const dfs = new DFS(node);
  expect(dfs.isDone()).toBe(false);
});

test("currentNode returns the next node to visit", () => {
  const node = generateNode(0, []);
  const dfs = new DFS(node);
  expect(dfs.currentNode()).toBe(node);
});

test("can search in graph with single node", () => {
  const node = generateNode(0, []);
  const dfs = new DFS(node);
  dfs.iterate();
  expect(dfs.isDone()).toBe(true);
});

test("iterates a simple tree (straight line)", () => {
  // 0 -> 1 -> 2
  const node2 = generateNode("2", []);
  const node1 = generateNode("1", [node2]);
  const node0 = generateNode("0", [node1]);
  const dfs = new DFS(node0);

  const visited = new Set();
  while (!dfs.isDone()) {
    visited.add(dfs.currentNode().getHash());
    dfs.iterate();
  }

  expect(visited).toEqual(new Set(["0", "1", "2"]));
});

test("iterates a node only once", () => {
  // 0 -> 1 -> (2, 3)
  const node2 = generateNode("2", []);
  const node3 = generateNode("3", []);
  const node1 = generateNode("1", [node2, node3]);
  const node0 = generateNode("0", [node1]);
  const dfs = new DFS(node0);

  const visited = [];
  while (!dfs.isDone()) {
    visited.push(dfs.currentNode().getHash());
    dfs.iterate();
  }

  expect(visited.length).toBe(4);
});

test("iterates depth first", () => {
  //      0
  //  1       2
  //  3       4
  const node3 = generateNode("3", []);
  const node4 = generateNode("4", []);
  const node1 = generateNode("1", [node3]);
  const node2 = generateNode("2", [node4]);
  const node0 = generateNode("0", [node1, node2]);
  const dfs = new DFS(node0);
  dfs.iterate();
  dfs.iterate();

  const hash = dfs.currentNode().getHash();
  const isLowestLevel = ["3", "4"].includes(hash);
  expect(isLowestLevel).toBe(true);
});
