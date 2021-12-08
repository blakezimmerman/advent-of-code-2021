import { runSolutions } from ".";

const part1 = (input: string) => {
  const lines = input.split("\n");
  let uniques = 0;

  for (const line of lines) {
    const [inputs, outputs] = parseLine(line);

    for (const output of outputs) {
      if (
        inputs.filter((input) => input.length === output.length).length === 1
      ) {
        uniques += 1;
      }
    }
  }

  return uniques;
};

const part2 = (input: string) => {
  const lines = input.split("\n");
  let result = 0;

  for (const line of lines) {
    const [inputs, outputs] = parseLine(line);

    const letters: Record<string, string> = {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      g: "",
    };

    const numbers: Record<number, string> = {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
    };

    // find 1, 4, 7, 8
    for (const input of inputs) {
      if (input.length === 2) {
        numbers[1] = input;
      } else if (input.length === 3) {
        numbers[7] = input;
      } else if (input.length === 4) {
        numbers[4] = input;
      } else if (input.length === 7) {
        numbers[8] = input;
      }
    }

    // compare 1 and 7 to find a
    letters.a = getExtraChars(numbers[7], numbers[1])[0];

    // use a and 4 to find 9 and g
    const almost9 = sortString(numbers[4] + letters.a);
    numbers[9] = inputs.filter(
      (input) => input.length === 6 && containsAllChars(input, almost9)
    )[0];
    letters.g = getExtraChars(numbers[9], almost9)[0];

    // compare 9 and 8 to find e
    letters.e = getExtraChars(numbers[8], numbers[9])[0];

    // use 9 to find 3
    numbers[3] = inputs.filter(
      (input) =>
        input.length === numbers[9].length - 1 &&
        containsAllChars(numbers[9], input) &&
        containsAllChars(input, numbers[1])
    )[0];

    // compare 9 and 3 to find b
    letters.b = getExtraChars(numbers[9], numbers[3])[0];

    // combine a, b, e, g, 1, and 8 to find d
    letters.d = getExtraChars(
      numbers[8],
      sortString(numbers[1] + letters.a + letters.b + letters.e + letters.g)
    )[0];

    // combine a, b, d, e, g to find 6 and f
    const almost6 = letters.a + letters.b + letters.d + letters.e + letters.g;
    numbers[6] = inputs.filter(
      (input) => input.length === 6 && containsAllChars(input, almost6)
    )[0];
    letters.f = getExtraChars(numbers[6], almost6)[0];

    // compare 6 and 1 to find c
    letters.c = getExtraChars(numbers[1], numbers[6])[0];

    // use a, b, c, e, f, and g to find 0
    numbers[0] = sortString(
      letters.a + letters.b + letters.c + letters.e + letters.f + letters.g
    );

    // use a, c, d, e, and g to find 2
    numbers[2] = sortString(
      letters.a + letters.c + letters.d + letters.e + letters.g
    );

    // use a, b, d, f, and g to find 5
    numbers[5] = sortString(
      letters.a + letters.b + letters.d + letters.f + letters.g
    );

    // translate outputs
    const signalTranslations = invertObject(numbers);
    let fourDigitCode = "";
    for (const output of outputs) {
      fourDigitCode += signalTranslations[output];
    }

    result += parseInt(fourDigitCode, 10);
  }

  return result;
};

const parseLine = (line: string) => {
  const [inputStr, outputStr] = line.split(" | ");
  const inputs = inputStr.split(" ").map(sortString);
  const outputs = outputStr.split(" ").map(sortString);
  return [inputs, outputs] as const;
};

const sortString = (str: string) => str.split("").sort().join("");

const getExtraChars = (str1: string, str2: string) =>
  str1.split("").filter((char) => !str2.includes(char));

const containsAllChars = (str: string, chars: string) =>
  chars.split("").every((char) => str.includes(char));

const invertObject = (obj: Record<string, string>) => {
  const result = {} as Record<string, string>;
  for (const key in obj) {
    result[obj[key]] = key;
  }
  return result;
};

runSolutions(part1, part2, "inputs/day8.txt");
