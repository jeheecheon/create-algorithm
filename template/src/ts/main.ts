const lines: string[] = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./src/input.txt")
    .toString()
    .split("\n")
    .map((line: string) => line.trim())
    .filter((line: string) => !!line);

(function solve() {
    console.log("print answer here");
})();
