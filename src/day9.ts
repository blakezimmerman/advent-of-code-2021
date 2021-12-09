import { runSolutions } from ".";

const part1 = (input: string) => {
  const lines = input.split("\n");
  const points = lines.map((line) =>
    line.split("").map((point) => parseInt(point, 10))
  );
  let result = 0;

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      const adjacentPoints = getAdjacentPoints(j, i, points);
      if (adjacentPoints.every((point) => point > points[i][j]))
        result += points[i][j] + 1;
    }
  }

  return result;
};

const part2 = (input: string) => {
  const lines = input.split("\n");
  const points = lines.map((line) =>
    line.split("").map((point) => parseInt(point, 10))
  );
  const lowPoints: Array<[number, number]> = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      const adjacentPoints = getAdjacentPoints(j, i, points);
      if (adjacentPoints.every((point) => point > points[i][j]))
        lowPoints.push([i, j]);
    }
  }

  const basinSizes = [];

  for (const lowPoint of lowPoints) {
    const basinCoords = new Set<string>();
    basinCoords.add(lowPoint.join(","));
    basinSizes.push(exploreBasin(points, lowPoint, basinCoords).size);
  }

  basinSizes.sort((a, b) => b - a);

  return basinSizes[0] * basinSizes[1] * basinSizes[2];
};

const getAdjacentPoints = (x: number, y: number, points: number[][]) => {
  const adjacentPoints: number[] = [];
  if (x > 0) {
    adjacentPoints.push(points[y][x - 1]);
  }
  if (x < points[y].length - 1) {
    adjacentPoints.push(points[y][x + 1]);
  }
  if (y > 0) {
    adjacentPoints.push(points[y - 1][x]);
  }
  if (y < points.length - 1) {
    adjacentPoints.push(points[y + 1][x]);
  }
  return adjacentPoints;
};

const exploreBasin = (
  points: number[][],
  coords: [y: number, x: number],
  basinCoords: Set<string>
) => {
  const curPoint = points[coords[0]][coords[1]];

  const adjacentCoords = getAdjacentCoords(coords[1], coords[0], points);

  for (const adjCoord of adjacentCoords) {
    const adjPoint = points[adjCoord[0]][adjCoord[1]];
    if (adjPoint > curPoint && adjPoint !== 9) {
      const coordStr = adjCoord.join(",");
      if (!basinCoords.has(coordStr)) {
        basinCoords.add(coordStr);
        basinCoords = exploreBasin(points, adjCoord, basinCoords);
      }
    }
  }

  return basinCoords;
};

const getAdjacentCoords = (x: number, y: number, points: number[][]) => {
  const adjacentPoints: Array<[number, number]> = [];
  if (x > 0) {
    adjacentPoints.push([y, x - 1]);
  }
  if (x < points[y].length - 1) {
    adjacentPoints.push([y, x + 1]);
  }
  if (y > 0) {
    adjacentPoints.push([y - 1, x]);
  }
  if (y < points.length - 1) {
    adjacentPoints.push([y + 1, x]);
  }
  return adjacentPoints;
};

runSolutions(part1, part2, "inputs/day9.txt");
