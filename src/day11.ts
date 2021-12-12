import { runSolutions } from ".";

const part1 = (input: string) => {
  const grid = inputToGrid(input);
  let numFlashes = 0;

  for (let step = 0; step < 100; step++) {
    // increase each by 1
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] += 1;
      }
    }

    // flash coords
    const flashedCoords: Set<string> = new Set();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        handleCoord(i, j, grid, flashedCoords);
      }
    }

    // reset flashed coords
    for (const coordStr of flashedCoords) {
      const coord = coordStr.split(",").map((x) => parseInt(x, 10));
      grid[coord[0]][coord[1]] = 0;
    }

    numFlashes += flashedCoords.size;
  }

  return numFlashes;
};

const part2 = (input: string) => {
  const grid = inputToGrid(input);
  let allFlashed = false;
  let step = 0;

  while (!allFlashed) {
    // increase each by 1
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] += 1;
      }
    }

    // flash coords
    const flashedCoords: Set<string> = new Set();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        handleCoord(i, j, grid, flashedCoords);
      }
    }

    // reset flashed coords
    for (const coordStr of flashedCoords) {
      const coord = coordStr.split(",").map((x) => parseInt(x, 10));
      grid[coord[0]][coord[1]] = 0;
    }

    step++;
    allFlashed = grid.every((line) => line.every((point) => point === 0));
  }

  return step;
};

const inputToGrid = (input: string) =>
  input
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char, 10)));

const getAdjacentCoords = (i: number, j: number, grid: number[][]) => {
  const adjacentPoints: Array<[number, number]> = [];

  if (i > 0) {
    adjacentPoints.push([i - 1, j]);
  }
  if (i < grid.length - 1) {
    adjacentPoints.push([i + 1, j]);
  }
  if (j > 0) {
    adjacentPoints.push([i, j - 1]);
  }
  if (j < grid[i].length - 1) {
    adjacentPoints.push([i, j + 1]);
  }

  if (i > 0 && j > 0) {
    adjacentPoints.push([i - 1, j - 1]);
  }
  if (i < grid.length - 1 && j < grid[i].length - 1) {
    adjacentPoints.push([i + 1, j + 1]);
  }
  if (i > 0 && j < grid[i].length - 1) {
    adjacentPoints.push([i - 1, j + 1]);
  }
  if (i < grid.length - 1 && j > 0) {
    adjacentPoints.push([i + 1, j - 1]);
  }

  return adjacentPoints;
};

const handleCoord = (
  i: number,
  j: number,
  grid: number[][],
  flashedCoords: Set<string>
) => {
  if (grid[i][j] > 9 && !flashedCoords.has(`${i},${j}`)) {
    flashedCoords.add(`${i},${j}`);
    const adjacentCoords = getAdjacentCoords(i, j, grid);
    for (const coord of adjacentCoords) {
      grid[coord[0]][coord[1]] += 1;
      handleCoord(coord[0], coord[1], grid, flashedCoords);
    }
  }
};

runSolutions(part1, part2, "inputs/day11.txt");
