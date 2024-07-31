import { execSync } from "child_process";

// Determine the correct command based on the operating system
const isWindows = process.platform === "win32";
const runCommand = isWindows ? "src\\main.out < src\\input.txt" : "./src/main.out < src/input.txt";

try {
    execSync(runCommand, { stdio: "inherit" });
    console.log("\nRan successfully!");
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
