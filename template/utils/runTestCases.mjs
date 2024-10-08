import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { existsSync, readdirSync } from "fs";

import { fetchBaekJoonTestCases } from "./fetchTestCases.mjs";
import { createTestCaseFiles, removeAll } from "./inputFiles.mjs";
import { srcDir } from "./paths.mjs";

export async function runBaekJoonTestCases(id, runCommand) {
    const testCasesDir = ".baekjoon";

    // remove test case files
    removeAll(testCasesDir);

    // fetch test cases
    const testCases = await fetchBaekJoonTestCases(id);

    if (!testCases) {
        return;
    }

    // create test case files
    createTestCaseFiles(testCasesDir, testCases);

    // run test cases
    runWithTestCases(runCommand, testCasesDir, testCases);

    // remove test case files
    removeAll(testCasesDir);
}

function runWithTestCases(runCommand, testCasesdir, testCases) {
    // check if test case files exist
    if (!existsSync(testCasesdir)) {
        return;
    }

    // get test case files
    const files = readdirSync(testCasesdir);
    if (files.length === 0) {
        return;
    }

    // run test cases
    for (let i = 0; i < files.length; ++i) {
        const fileName = files[i];
        const testCase = testCases[i];

        const spinner = ora(`Running Test Case ${i + 1}`).start();
        try {
            const runWithInputCmd = `${runCommand} < ../${testCasesdir}/${fileName}`;

            const start = performance.now();

            const output = execSync(runWithInputCmd, {
                signal: AbortSignal.timeout(2000),
                cwd: srcDir
            }).toString();

            const end = performance.now();

            let succeeded =
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
                answer: testCase.output
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
