import { readInput } from ".";

const part1 = (input: string) => {
  const commands = input.trim().split("\n");
  let x = 0;
  let y = 0;

  for (const command of commands) {
    if (command.includes("forward")) {
      x += +command.split(" ")[1];
    } else if (command.includes("down")) {
      y += +command.split(" ")[1];
    } else if (command.includes("up")) {
      y -= +command.split(" ")[1];
    }
  }

  return x * y;
};

const part2 = (input: string) => {
  const commands = input.trim().split("\n");
  let x = 0;
  let y = 0;
  let aim = 0;

  for (const command of commands) {
    if (command.includes("forward")) {
      const value = +command.split(" ")[1];
      x += value;
      y += aim * value;
    } else if (command.includes("down")) {
      aim += +command.split(" ")[1];
    } else if (command.includes("up")) {
      aim -= +command.split(" ")[1];
    }
  }

  return x * y;
};

console.log(part1(readInput("inputs/day2.txt")));
console.log(part2(readInput("inputs/day2.txt")));
