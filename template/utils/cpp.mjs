import path from "path";

import { isWindows, srcDir } from "./paths.mjs";
import run from "./run.mjs";

const compileResultPath = path.join(srcDir, "/main.out");
const sourceFilePath = path.join(srcDir, "/cpp/main.cpp");

const compileCommand = "g++ -std=c++17 -o main.out cpp/main.cpp";
const runCommand = isWindows ? "main.out" : "./main.out";

await run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
});
