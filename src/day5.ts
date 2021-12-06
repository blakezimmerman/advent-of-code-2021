import { readInput } from ".";

const getOverlappedPoints = (input: string, checkDiagonal: boolean) => {
  const points: Record<string, number> = {};

  const lines = input.split("\n");
  for (const line of lines) {
    const [coord1, coord2] = line.split(" -> ");
    const [x1, y1] = coord1.split(",").map((num) => parseInt(num));
    const [x2, y2] = coord2.split(",").map((num) => parseInt(num));

    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        const coord = `${x1},${i}`;
        if (points[coord]) points[coord] += 1;
        else points[coord] = 1;
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        const coord = `${i},${y1}`;
        if (points[coord]) points[coord] += 1;
        else points[coord] = 1;
      }
    } else if (checkDiagonal) {
      const xIncreasing = x2 > x1;
      const yIncreasing = y2 > y1;
      for (let i = 0; i <= Math.abs(x2 - x1); i++) {
        const coord = `${xIncreasing ? x1 + i : x1 - i},${
          yIncreasing ? y1 + i : y1 - i
        }`;
        if (points[coord]) points[coord] += 1;
        else points[coord] = 1;
      }
    }
  }

  return Object.values(points).reduce((acc, cur) => {
    if (cur > 1) acc += 1;
    return acc;
  }, 0);
};

const part1 = (input: string) => {
  return getOverlappedPoints(input, false);
};

const part2 = (input: string) => {
  return getOverlappedPoints(input, true);
};

console.log(part1(readInput("inputs/day5.txt")));
console.log(part2(readInput("inputs/day5.txt")));
