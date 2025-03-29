import { existsSync, mkdirSync, readdirSync, rmdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";

export function createTestCaseFiles(dest, testCases) {
    if (!existsSync(dest)) {
        try {
            mkdirSync(dest, { recursive: true });
        } catch (error) {
            console.error("Failed to create test case directory!", error);
            process.exit(1);
        }
    }

    testCases.forEach((tc, index) => {
        try {
            writeFileSync(`${dest}/${index + 1}.txt`, tc.input, "utf-8");
        } catch (error) {
            console.error("Failed to create test case file!", error);
            process.exit(1);
        }
    });
}

export function removeAll(path) {
    if (!existsSync(path)) {
        return;
    }

    try {
        readdirSync(path).forEach((file) => {
            unlinkSync(join(path, file));
        });

        rmdirSync(path);
    } catch (error) {
        console.error(`Failed to remove directory!: ${path}`, error);
        process.exit(1);
    }
}
