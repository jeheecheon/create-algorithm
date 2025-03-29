import chalk from "chalk";
import { execSync } from "child_process";
import { existsSync, readFileSync, unlinkSync } from "fs";
import ora from "ora";
import { getSrcPath } from "./path.mjs";
import { runBaekJoonTestCasesAsync } from "./runTestCases.mjs";

export default async function run({
    compileResultPath,
    sourceFilePath,
    compileCommand,
    runCommand,
    needsCompile = true,
}) {
    console.clear();

    if (needsCompile) {
        if (existsSync(compileResultPath)) {
            unlinkSync(compileResultPath);
        }

        const spinner = ora("Compiling...").start();
        try {
            execSync(compileCommand, { stdio: "inherit", cwd: getSrcPath() });
            spinner.succeed("Compiled successfully!");
        } catch (error) {
            spinner.fail("Failed to compile!");
            spinner.stop();
            process.exit(1);
        }
        console.clear();
    }

    if (!existsSync(sourceFilePath)) {
        console.error("source file does not exist!");
        process.exit(1);
    }

    const fileContent = readFileSync(sourceFilePath, "utf-8");
    if (!fileContent) {
        console.error("source file is empty!");
        process.exit(1);
    }

    const lines = fileContent.split("\n");
    if (lines.length === 0) {
        console.error("source file is empty!");
        process.exit(1);
    }

    const firstLine = lines[0].trim();
    const bojNumberMatch1 = firstLine.match(
        /^\/\/ (boj|backjoon|baekjoon|벡준|백준|acmicpc|\(boj\)|\(backjoon\)|\(baekjoon\)|\(벡준\)|\(백준\)|\(acmicpc\)) (\d+)$/,
    );
    const bojNumberMatch2 = firstLine.match(
        /^# (boj|backjoon|baekjoon|벡준|백준|acmicpc|\(boj\)|\(backjoon\)|\(baekjoon\)|\(벡준\)|\(백준\)|\(acmicpc\)) (\d+)$/,
    );

    const bojNumber = bojNumberMatch1[2] || bojNumberMatch2[2];
    if (!bojNumber || isNaN(bojNumber)) {
        console.log(chalk.yellow("No problem number found!"));
    } else {
        await runBaekJoonTestCasesAsync(bojNumber, runCommand);
    }

    try {
        console.log(chalk.bgMagentaBright("Custom Test Case Output:"));

        const start = performance.now();
        execSync(`${runCommand} < input.txt`, {
            stdio: "inherit",
            cwd: getSrcPath(),
            signal: AbortSignal.timeout(2000),
        });
        const end = performance.now();

        const duration = end - start;
        console.log(
            `${chalk.blueBright("\nRan successfully in")} ${chalk.magentaBright(
                `${duration.toFixed(2)} ms`,
            )}`,
        );
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        if (existsSync(compileResultPath)) {
            unlinkSync(compileResultPath);
        }
    }
}
