/**
 * Input
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "./src/input.txt";
const input: string[] = require("fs").readFileSync(filePath).toString().trim().split("\n");

/**
 * Solution
 */
