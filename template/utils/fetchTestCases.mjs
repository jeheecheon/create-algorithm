import chalk from "chalk";
import * as cheerio from "cheerio";
import ora from "ora";
import { performance } from "perf_hooks";

export async function fetchBaekJoonTestCases(id) {
    const spinner = ora("Fetching Test Case...").start();
    const start = performance.now();

    try {
        const url = `https://www.acmicpc.net/problem/${id}`;
        const headers = {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        };

        const response = await fetch(url, { headers });

        if (response.status === 404) {
            spinner.fail(chalk.red("❌ Failed Fetching Testcases"));
            console.log(chalk.red(`404 NOT FOUND - Problem with ID ${id}`));
            return null;
        }

        const html = await response.text();
        if (!html) {
            return null;
        }

        const $ = cheerio.load(html);
        const testCases = [];

        $("[id*=sample-input]").each((i, el) => {
            const input = $(el).text();
            const output = $(el).parent().parent().next().find("[id*=sample-output]").text();
            testCases.push({ input, output });
        });

        spinner.succeed("✅ Fetching Success");
        const end = performance.now();
        console.log(chalk.dim(`⏱️ Fetched in ${(end - start).toFixed(2)}ms`));

        return testCases;
    } catch (error) {
        console.log(chalk.red("💥 Error:"), error);
        return null;
    } finally {
        spinner.stop();
        console.log(chalk.dim("🔍 Test Cases Fetched"));
    }
}
