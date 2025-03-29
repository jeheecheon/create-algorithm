import path from "path";
import { getSrcPath } from "./path.mjs";
import run from "./run.mjs";

const sourceFilePath = path.join(getSrcPath(), "py/Main.py");

const runCommand = "python py/Main.py";

await run({
    sourceFilePath,
    runCommand,
    needsCompile: false,
});
