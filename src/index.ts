import { readFileSync } from "fs";

export const readInput = (path: string) => {
  return readFileSync(path, { encoding: "utf-8" });
};
