import { execSync } from "child_process";
import { existsSync, unlinkSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { runBaekJoonTestCases } from "./runTestCases.mjs";
import ora from "ora";
import chalk from "chalk";
import { performance } from "perf_hooks";

const isWindows = process.platform === "win32";

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const parentDir = path.dirname(currentDir);

export const srcDir = path.join(parentDir, "src");
const outputPath = path.join(srcDir, "main.out");
const sourceFilePath = path.join(srcDir, "main.cpp");

const runCommand = isWindows ? "main.out" : "./main.out";


// clear terminal
console.clear();

// delete output file before compiling
if (existsSync(outputPath)) unlinkSync(outputPath);

let spinner = ora("Compiling...").start();
try {
    // compile
    execSync("g++ -o main.out main.cpp", { stdio: "inherit", cwd: srcDir });
    spinner.succeed("Compiled successfully!");
} catch (error) {
    spinner.fail("Failed to compile!");
    spinner.stop();
    process.exit(1);
}

// clear terminal
console.clear();

// extract problem number
if (!existsSync(sourceFilePath)) {
    console.error("main.cpp does not exist!");
    process.exit(1);
}

// read file content
const fileContent = readFileSync(sourceFilePath, "utf-8");

// check if file is empty
if (!fileContent) {
    console.error("main.cpp is empty!");
    process.exit(1);
}

// extract boj number
const lines = fileContent.split("\n");

// check if file is empty
if (lines.length === 0) {
    console.error("main.cpp is empty!");
    process.exit(1);
}

// get first line
const firstLine = lines[0].trim();
const bojNumberMatch = firstLine.match(/^\/\/ boj (\d+)$/);
let bojNumber = null;

// extract boj number
if (bojNumberMatch) {
    bojNumber = bojNumberMatch[1];
    bojNumber = +bojNumber;
}

// run baekjoon test cases
if (!bojNumberMatch || isNaN(bojNumber) || !bojNumberMatch) {
    console.log(chalk.yellow("No problem number found!"));
} else {
    await runBaekJoonTestCases(bojNumber, outputPath);
}

try {
    // run with input.txt
    console.log(chalk.bgMagentaBright("Custom Test Case Output:"));

    const start = performance.now();
    execSync(`${runCommand} < input.txt`, {
        stdio: "inherit",
        cwd: srcDir,
        signal: AbortSignal.timeout(2000)
    });
    const end = performance.now();
    const duration = end - start;
    console.log(
        `${chalk.blueBright("\nRan successfully in")} ${chalk.magentaBright(
            `${duration.toFixed(2)} ms`
        )}`
    );
} catch (error) {
    console.error("Error:", error.message);
} finally {
    // delete output file after running
    if (existsSync("src/main.out")) unlinkSync("src/main.out");
}
