import path from "path";
import run from "./run.mjs";

const srcDir = path.resolve("src");
const sourceFilePath = path.join(srcDir, "py/Main.py");

const runCommand = "python py/Main.py";

await run({
    sourceFilePath,
    runCommand,
    needsCompile: false,
});
