import path from "path";

import { getSrcPath } from "./path.mjs";
import run from "./run.mjs";

const compileResultPath = path.join(getSrcPath(), "Main.class");
const sourceFilePath = path.join(getSrcPath(), "kotlin/Main.kt");

const compileCommand = "kotlinc ./kotlin/Main.kt -include-runtime -d Main.jar";
const runCommand = "java -jar Main.jar";

await run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
});
