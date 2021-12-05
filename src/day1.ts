import { readInput } from ".";

const part1 = (input: string) => {
  const numbers = input.split("\n").map((line) => parseInt(line));

  let result = 0;
  let prev: number | undefined = undefined;

  for (const value of numbers) {
    if (prev !== undefined && value > prev) {
      result++;
    }
    prev = value;
  }

  return result;
};

const part2 = (input: string) => {
  const numbers = input.split("\n").map((line) => parseInt(line));

  let result = 0;
  let prev: number | undefined = undefined;

  for (let i = 0; i < numbers.length - 2; i++) {
    const windowVal = numbers[i] + numbers[i + 1] + numbers[i + 2];
    if (prev !== undefined && windowVal > prev) {
      result++;
    }
    prev = windowVal;
  }

  return result;
};

console.log(part1(readInput("inputs/day1.txt")));
console.log(part2(readInput("inputs/day1.txt")));
