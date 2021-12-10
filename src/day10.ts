import { runSolutions } from ".";

const openingCharMap: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};
const closingCharMap: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const part1 = (input: string) => {
  const lines = input.split("\n");
  const scoreGuide: Record<string, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  let score = 0;

  for (const line of lines) {
    const stack: string[] = [];
    for (const char of line) {
      if (openingCharMap[char]) {
        stack.push(char);
      } else if (closingCharMap[char]) {
        const openingChar = closingCharMap[char];
        if (stack.at(-1) !== openingChar) {
          score += scoreGuide[char];
          break;
        }
        stack.pop();
      }
    }
  }

  return score;
};

const part2 = (input: string) => {
  const lines = input.split("\n");
  const scoreGuide: Record<string, number> = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  const scores: number[] = [];

  lineLoop: for (const line of lines) {
    const stack: string[] = [];
    for (const char of line) {
      if (openingCharMap[char]) {
        stack.push(char);
      } else if (closingCharMap[char]) {
        const openingChar = closingCharMap[char];
        if (stack.at(-1) !== openingChar) {
          continue lineLoop;
        }
        stack.pop();
      }
    }

    scores.push(
      stack
        .reverse()
        .map((char) => scoreGuide[openingCharMap[char]])
        .reduce((acc, cur) => acc * 5 + cur, 0)
    );
  }

  return scores.sort((a, b) => b - a)[Math.floor(scores.length / 2)];
};

runSolutions(part1, part2, "inputs/day10.txt");
