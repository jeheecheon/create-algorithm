import * as cheerio from "cheerio";
import { performance } from "perf_hooks";
import ora from "ora";
import chalk from "chalk";

export async function fetchBaekJoonTestCases(id) {
    const spinner = ora("Fetching Test Case...").start();
    const url = `https://www.acmicpc.net/problem/${id}`;
    const start = performance.now();
    const userAgent =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";

    return await fetch(url, {
        headers: {
            "User-Agent": userAgent
        }
    })
        .then((response) => {
            if (response.status === 404) {
                spinner.fail(chalk.red("Failed Fetching Testcases"));
                console.log(chalk.red("404 NOT FOUND - Problem with ID ", id.toString()));
                return null;
            }
            return response.text();
        })
        .then((body) => {
            if (!body) {
                return null;
            }

            const $ = cheerio.load(body);
            const testCases = [];

            $("[id*=sample-input]").each((i, el) => {
                const input = $(el).text();
                const output = $(el).parent().parent().next().find("[id*=sample-output]").text();
                testCases[i] = { input, output };
            });

            spinner.succeed("Fetching Success");
            const end = performance.now();
            console.log(chalk.dim(`Fetched in ${(end - start).toFixed(2)}ms`));

            return testCases;
        })
        .catch((error) => {
            console.log(chalk.red(error));
            return null;
        })
        .finally(() => {
            spinner.stop();
            console.log();
        });
}
