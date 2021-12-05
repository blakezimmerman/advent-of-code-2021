import { readInput } from ".";

const part1 = (input: string) => {
  const lines = input.trim().split("\n");
  const draws = parseDraws(lines[0]);

  const boards = parseBoards(lines);

  let drawnNumbers = [];
  for (const number of draws) {
    drawnNumbers.push(number);
    for (const board of boards) {
      const winningScore = getScoreIfWon(board, drawnNumbers);
      if (winningScore !== undefined) {
        return number * winningScore;
      }
    }
  }

  return -1;
};

const part2 = (input: string) => {
  const lines = input.trim().split("\n");
  const draws = parseDraws(lines[0]);

  const boards = parseBoards(lines);

  let drawnNumbers = [];
  let winningBoardIndices: number[] = [];
  for (const number of draws) {
    drawnNumbers.push(number);
    for (let i = 0; i < boards.length; i++) {
      if (winningBoardIndices.includes(i)) continue;
      const board = boards[i];
      const winningScore = getScoreIfWon(board, drawnNumbers);
      if (winningScore !== undefined) {
        winningBoardIndices.push(i);

        if (winningBoardIndices.length === boards.length) {
          return number * winningScore;
        }
      }
    }
  }

  return -1;
};

const parseDraws = (drawsString: string) => {
  return drawsString.split(",").map((num) => parseInt(num, 10));
};

const parseBoards = (lines: string[]) => {
  const boardStrings: string[] = [];

  let curBoard = "";
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") {
      if (curBoard) boardStrings.push(curBoard);
      curBoard = "";
    } else curBoard += `${line}\n`;
  }
  boardStrings.push(curBoard);

  const boards = boardStrings.map((boardString) => {
    const board = [];
    for (const line of boardString.split("\n").slice(0, -1)) {
      board.push(
        line
          .split(" ")
          .filter((char) => char)
          .map((num) => parseInt(num, 10))
      );
    }
    return board;
  });

  return boards;
};

const getScoreIfWon = (board: number[][], drawnNumbers: number[]) => {
  const verticalLines = [];
  for (let i = 0; i < board[0].length; i++) {
    let verticalLine = [];
    for (const line of board) {
      verticalLine.push(line[i]);
    }
    verticalLines.push(verticalLine);
  }

  const linesToCheck = [...board, ...verticalLines];
  for (const line of linesToCheck) {
    if (line.every((number) => drawnNumbers.includes(number))) {
      let score = 0;
      for (const row of board) {
        for (const number of row) {
          if (!drawnNumbers.includes(number)) score += number;
        }
      }
      return score;
    }
  }

  return undefined;
};

console.log(part1(readInput("inputs/day4.txt")));
console.log(part2(readInput("inputs/day4.txt")));
