import path from "path";

import { isWindows, srcDir } from "./paths.mjs";
import run from "./run.mjs";

const compileResultPath = path.join(srcDir, "/main.out");
const sourceFilePath = path.join(srcDir, "/c/main.c");

const compileCommand = "gcc -o main.out c/main.c";
const runCommand = isWindows ? "main.out" : "./main.out";

await run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand
});
