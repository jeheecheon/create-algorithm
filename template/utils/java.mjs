import path from "path";

import { srcDir } from "./paths.mjs";
import run from "./run.mjs";

const compileResultPath = path.join(srcDir, "Main.class");
const sourceFilePath = path.join(srcDir, "java/Main.java");

const compileCommand = "javac -d . ./java/Main.java";
const runCommand = "java Main";

await run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
});
