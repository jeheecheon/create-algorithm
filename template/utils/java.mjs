import path from "path";

import { getSrcPath } from "./path.mjs";
import run from "./run.mjs";

const compileResultPath = path.join(getSrcPath(), "Main.class");
const sourceFilePath = path.join(getSrcPath(), "java/Main.java");

const compileCommand = "javac -d . ./java/Main.java";
const runCommand = "java Main";

await run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
});
