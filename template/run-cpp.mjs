import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";

// Determine the correct command based on the operating system
const isWindows = process.platform === "win32";
const runCommand = isWindows ? "src\\main.out < src\\input.txt" : "./src/main.out < src/input.txt";

try {
    if (existsSync("src/main.out")) {
        execSync(runCommand, { stdio: "inherit" });
        console.log("\nRan successfully!");
        unlinkSync("src/main.out"); // Clean up existing file if any
    }
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
