import path from "path";

import { srcDir } from "./paths.mjs";
import run from "./run.mjs";

const compileResultPath = path.join(srcDir, "Main.class");
const sourceFilePath = path.join(srcDir, "kotlin/Main.kt");

const compileCommand = "kotlinc ./kotlin/Main.kt -include-runtime -d Main.jar";
const runCommand = "java -jar Main.jar";

await run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
});
