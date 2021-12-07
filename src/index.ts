import { readFileSync } from "fs";

export const runSolutions = (
  part1: (input: string) => unknown,
  part2: (input: string) => unknown,
  inputPath: string
) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" });
  console.log(part1(input));
  console.log(part2(input));
};
