const input: string[] = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./src/input.txt")
    .toString()
    .trim()
    .split("\n")
    .map((line: string) => line.trim());

(function solve() {
    console.log("print answer here");
})();
