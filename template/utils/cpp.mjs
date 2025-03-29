import path from "path";

import { getIsWindows, getSrcPath } from "./path.mjs";
import run from "./run.mjs";

const compileResultPath = path.join(getSrcPath(), "/main.out");
const sourceFilePath = path.join(getSrcPath(), "/cpp/main.cpp");

const compileCommand = "g++ -std=c++17 -o main.out cpp/main.cpp";
const runCommand = getIsWindows ? "main.out" : "./main.out";

await run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
});
