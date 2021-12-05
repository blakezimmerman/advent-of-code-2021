import { readInput } from ".";

const part1 = (input: string) => {
  const numbers = input.trim().split("\n");
  const counts: Record<number, Record<string, number>> = {};

  for (const number of numbers) {
    for (let i = 0; i < number.length; i++) {
      const bit = number[i];
      if (!counts[i]) counts[i] = { "0": 0, "1": 0 };
      counts[i][bit] += 1;
    }
  }

  let gamma = "";
  Object.values(counts).forEach((value) => {
    if (value["0"] > value["1"]) gamma += "0";
    else gamma += "1";
  });

  let epsilon = "";
  for (const bit of gamma) {
    if (bit === "0") epsilon += "1";
    else epsilon += "0";
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const part2 = (input: string) => {
  const numbers = input.trim().split("\n");
  let counts: Record<number, Record<string, number>> = {};

  const updateCounts = (nums: string[]) => {
    const newCounts: typeof counts = {};
    for (const number of nums) {
      for (let i = 0; i < number.length; i++) {
        const bit = number[i];
        if (!newCounts[i]) newCounts[i] = { "0": 0, "1": 0 };
        newCounts[i][bit] += 1;
      }
    }
    counts = { ...newCounts };
  };
  updateCounts(numbers);

  let aMatches = numbers;
  for (const key of Object.keys(counts) as unknown as number[]) {
    if (aMatches.length === 1) break;

    if (counts[key]["1"] >= counts[key]["0"]) {
      aMatches = aMatches.filter((match) => match[key] === "1");
    } else {
      aMatches = aMatches.filter((match) => match[key] === "0");
    }
    updateCounts(aMatches);
  }
  const a = parseInt(aMatches[0], 2);

  let bMatches = numbers;
  for (const key of Object.keys(counts) as unknown as number[]) {
    if (bMatches.length === 1) break;

    if (counts[key]["0"] <= counts[key]["1"]) {
      bMatches = bMatches.filter(
        (match) => match[key as unknown as number] === "0"
      );
    } else {
      bMatches = bMatches.filter(
        (match) => match[key as unknown as number] === "1"
      );
    }
    updateCounts(bMatches);
  }
  const b = parseInt(bMatches[0], 2);

  return a * b;
};

console.log(part1(readInput("inputs/day3.txt")));
console.log(part2(readInput("inputs/day3.txt")));
