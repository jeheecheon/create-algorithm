const lines = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./src/input.txt")
    .toString()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line);

(function solve() {
    console.log("print answer here");
})();
