import { runSolutions } from ".";

const part1 = (input: string) => {
  const positions = input.split(",").map((num) => parseInt(num));
  const minPosition = Math.min(...positions);
  const maxPosition = Math.max(...positions);
  const fuelCosts: number[] = [];

  for (let destPos = minPosition; destPos <= maxPosition; destPos++) {
    let cost = 0;
    for (const curPos of positions) {
      cost += Math.abs(destPos - curPos);
    }
    fuelCosts.push(cost);
  }

  return Math.min(...fuelCosts);
};

const part2 = (input: string) => {
  const positions = input.split(",").map((num) => parseInt(num));
  const minPosition = Math.min(...positions);
  const maxPosition = Math.max(...positions);
  const fuelCosts: number[] = [];

  const getCost = (moves: number) => {
    let cost = 0;
    for (let move = 1; move <= moves; move++) {
      cost += move;
    }
    return cost;
  };

  for (let destPos = minPosition; destPos <= maxPosition; destPos++) {
    let cost = 0;
    for (const curPos of positions) {
      cost += getCost(Math.abs(destPos - curPos));
    }
    fuelCosts.push(cost);
  }

  return Math.min(...fuelCosts);
};

runSolutions(part1, part2, "inputs/day7.txt");
