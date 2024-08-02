import { writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync, rmdirSync } from "fs";
import { join } from "path";

export function createTestCaseFiles(dest, testCases) {
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });

    testCases.forEach((tc, index) => {
        writeFileSync(`${dest}/${index + 1}.txt`, tc.input, "utf-8");
    });
}

export function removeAll(dir) {
    if (existsSync(dir)) {
        const files = readdirSync(dir);
        for (const file of files) unlinkSync(join(dir, file));

        rmdirSync(dir);
    }
}
