import { runSolutions } from ".";

const part1 = (input: string) => {
  const NUM_DAYS = 80;
  const fish = input.split(",").map((num) => parseInt(num, 10));

  for (let day = 0; day < NUM_DAYS; day++) {
    for (let i = 0; i < fish.length; i++) {
      if (fish[i] === 0) {
        fish[i] = 6;
        fish.push(9);
      } else {
        fish[i] -= 1;
      }
    }
  }

  return fish.length;
};

const part2 = (input: string) => {
  const NUM_DAYS = 256;
  const fish = input.split(",").map((num) => parseInt(num, 10));

  let counts: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  for (const curFish of fish) {
    counts[curFish] += 1;
  }

  for (let day = 0; day < NUM_DAYS; day++) {
    counts = {
      0: counts[1],
      1: counts[2],
      2: counts[3],
      3: counts[4],
      4: counts[5],
      5: counts[6],
      6: counts[7] + counts[0],
      7: counts[8],
      8: counts[0],
    };
  }

  return Object.values(counts).reduce((acc, cur) => (acc += cur), 0);
};

runSolutions(part1, part2, "inputs/day6.txt");
