import chalk from "chalk";
import { execSync } from "child_process";
import { existsSync, readdirSync } from "fs";
import ora from "ora";

import { fetchBaekJoonTestCases } from "./fetchTestCases.mjs";
import { createTestCaseFiles, removeAll } from "./inputFiles.mjs";
import { getSrcPath } from "./path.mjs";

export async function runBaekJoonTestCasesAsync(id, runCommand) {
    const testCasesDir = ".baekjoon";

    removeAll(testCasesDir);
    const testCases = await fetchBaekJoonTestCases(id);
    if (!testCases) {
        return;
    }

    createTestCaseFiles(testCasesDir, testCases);
    runWithTestCases(runCommand, testCasesDir, testCases);
    removeAll(testCasesDir);
}

function runWithTestCases(runCommand, testCasesdir, testCases) {
    if (!existsSync(testCasesdir)) {
        return;
    }

    const files = readdirSync(testCasesdir);
    if (files.length === 0) {
        return;
    }

    for (let i = 0; i < files.length; ++i) {
        const fileName = files[i];
        const testCase = testCases[i];

        const spinner = ora(`Running Test Case ${i + 1}`).start();
        try {
            const runWithInputCmd = `${runCommand} < ../${testCasesdir}/${fileName}`;

            const start = performance.now();
            const output = execSync(runWithInputCmd, {
                signal: AbortSignal.timeout(2000),
                cwd: getSrcPath(),
            }).toString();
            const end = performance.now();

            const succeeded =
                removeLeadingSpaces(output.trim()) === removeLeadingSpaces(testCase.output.trim());

            if (succeeded) {
                spinner.succeed(chalk.bgMagentaBright(`Test Case ${i + 1} Passed`));
            } else {
                spinner.fail(chalk.bgMagentaBright(`Test Case ${i + 1} Failed`));
            }

            const t = {
                idx: i + 1,
                duration: (end - start).toFixed(0),
                succeeded: succeeded,
                output: output,
                answer: testCase.output,
            };
            printTestCaseResult(t);
        } catch (error) {
            spinner.fail(`Test Case ${i + 1} Failed`);
            if (error.name === "AbortError") {
                console.error(chalk.red("Error: Time Limit Exceeded"));
            } else {
                console.error(chalk.red("Error:"), error.message);
            }
        } finally {
            spinner.stop();
        }
    }
}

function removeLeadingSpaces(str) {
    return str
        .replace(/[ \t\r]+/g, " ")
        .replace(/ +\n/g, "\n")
        .trim();
}

function printTestCaseResult(t) {
    console.log(chalk.magentaBright(`Duration: ${t.duration}ms`));
    console.log(chalk.cyanBright("Output:"));
    console.log(t.output);
    console.log(chalk.cyanBright("Answer:"));
    console.log(t.answer);
}
