import path from "path";
import run from "./run.mjs";

const srcDir = path.resolve("src");
const sourceFilePath = path.join(srcDir, "cs/Program.cs");

const runCommand = `dotnet run --project ${path.join(srcDir, "cs")}`;

await run({
    sourceFilePath,
    runCommand,
    needsCompile: false
});
