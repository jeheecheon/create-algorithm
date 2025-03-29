import path from "path";
import { getSrcPath } from "./path.mjs";
import run from "./run.mjs";

const sourceFilePath = path.join(getSrcPath(), "cs/Program.cs");

const runCommand = `dotnet run --project ${path.join(getSrcPath(), "cs")}`;

await run({
    sourceFilePath,
    runCommand,
    needsCompile: false,
});
