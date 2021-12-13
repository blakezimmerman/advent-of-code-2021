import { runSolutions } from ".";

const part1 = (input: string) => {
  const connections = parseInput(input);
  let paths = 0;

  for (const cave of Object.keys(connections)) {
    if (cave !== "start") continue;
    paths += visitCave(cave, connections, new Set<string>());
  }

  return paths;
};

const part2 = (input: string) => {
  const connections = parseInput(input);
  let paths = 0;

  for (const cave of Object.keys(connections)) {
    if (cave !== "start") continue;
    paths += visitCave2(cave, connections, new Map<string, number>());
  }

  return paths;
};

const parseInput = (input: string) => {
  const connections: Record<string, string[]> = {};
  const lines = input.split("\n");
  for (const connection of lines) {
    const [start, end] = connection.split("-");

    if (connections[start]) connections[start].push(end);
    else connections[start] = [end];

    if (connections[end]) connections[end].push(start);
    else connections[end] = [start];
  }
  return connections;
};

const visitCave = (
  cave: string,
  connections: Record<string, string[]>,
  visitedCaves: Set<string>
) => {
  let paths = 0;
  if (cave === "end") return 1;
  visitedCaves.add(cave);
  const destinations = connections[cave];
  for (const destination of destinations) {
    if (
      destination === destination.toLowerCase() &&
      visitedCaves.has(destination)
    ) {
      continue;
    }
    paths += visitCave(
      destination,
      connections,
      new Set<string>(Array.from(visitedCaves))
    );
  }
  return paths;
};

const visitCave2 = (
  cave: string,
  connections: Record<string, string[]>,
  visitedCaves: Map<string, number>
) => {
  let paths = 0;
  if (cave === "start" && visitedCaves.has(cave)) return 0;
  if (cave === "end") return 1;

  if (cave === cave.toLowerCase()) {
    const count = visitedCaves.get(cave);
    if (count) {
      if (count > 1) return 0;
      const smallCaveVisitedTwice = Array.from(visitedCaves.entries())
        .filter(
          ([key]) =>
            key === key.toLowerCase() && key !== "start" && key !== "end"
        )
        .some(([_, value]) => value > 1);
      if (smallCaveVisitedTwice) return 0;
    }
  }

  const count = visitedCaves.get(cave);
  if (count !== undefined) {
    visitedCaves.set(cave, count + 1);
  } else {
    visitedCaves.set(cave, 1);
  }

  const destinations = connections[cave];
  for (const destination of destinations) {
    paths += visitCave2(
      destination,
      connections,
      new Map<string, number>(visitedCaves)
    );
  }
  return paths;
};

runSolutions(part1, part2, "inputs/day12.txt");
