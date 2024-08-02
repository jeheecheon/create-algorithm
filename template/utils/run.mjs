import { execSync } from "child_process";
import { existsSync, readFileSync, unlinkSync } from "fs";
import { srcDir } from "./paths.mjs";
import ora from "ora";
import chalk from "chalk";
import { runBaekJoonTestCases } from "./runTestCases.mjs";

export default async function run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
    needsCompile = true
}) {
    // clear terminal
    console.clear();

    if (needsCompile) {
        // delete output file before compiling
        if (existsSync(compileResultPath)) unlinkSync(compileResultPath);

        let spinner = ora("Compiling...").start();
        try {
            // compile
            execSync(compileCommand, { stdio: "inherit", cwd: srcDir });
            spinner.succeed("Compiled successfully!");
        } catch (error) {
            spinner.fail("Failed to compile!");
            spinner.stop();
            process.exit(1);
        }

        // clear terminal
        console.clear();
    }

    // extract problem number
    if (!existsSync(sourceFilePath)) {
        console.error("source file does not exist!");
        process.exit(1);
    }

    // read file content
    const fileContent = readFileSync(sourceFilePath, "utf-8");

    // check if file is empty
    if (!fileContent) {
        console.error("source file is empty!");
        process.exit(1);
    }

    // extract boj number
    const lines = fileContent.split("\n");

    // check if file is empty
    if (lines.length === 0) {
        console.error("source file is empty!");
        process.exit(1);
    }

    // get first line
    const firstLine = lines[0].trim();
    const bojNumberMatch1 = firstLine.match(
        /^\/\/ (boj|backjoon|baekjoon|벡준|백준|acmicpc|\(boj\)|\(backjoon\)|\(baekjoon\)|\(벡준\)|\(백준\)|\(acmicpc\)) (\d+)$/
    );
    const bojNumberMatch2 = firstLine.match(
        /^# (boj|backjoon|baekjoon|벡준|백준|acmicpc|\(boj\)|\(backjoon\)|\(baekjoon\)|\(벡준\)|\(백준\)|\(acmicpc\)) (\d+)$/
    );
    let bojNumber = null;

    // extract boj number
    if (bojNumberMatch1) bojNumber = +bojNumberMatch1[2];
    else if (bojNumberMatch2) bojNumber = +bojNumberMatch2[2];

    // run baekjoon test cases
    if (!bojNumber || isNaN(bojNumber)) {
        console.log(chalk.yellow("No problem number found!"));
    } else {
        await runBaekJoonTestCases(bojNumber, runCommand);
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
        if (existsSync(compileResultPath)) unlinkSync(compileResultPath);
    }
}
