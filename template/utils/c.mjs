import path from "path";

import { isWindows, getSrcPath } from "./path.mjs";
import run from "./run.mjs";

const compileResultPath = path.join(getSrcPath(), "/main.out");
const sourceFilePath = path.join(getSrcPath(), "/c/main.c");

const compileCommand = "gcc -o main.out c/main.c";
const runCommand = isWindows() ? "main.out" : "./main.out";

await run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
});
