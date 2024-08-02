import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";

const isWindows = process.platform === "win32";

const compileCommand = "g++ -o src/main.out src/main.cpp";
const clearCommand = "npm run clear-terminal";
const runCommand = isWindows ? "src\\main.out < src\\input.txt" : "./src/main.out < src/input.txt";

try {
    if (existsSync("src/main.out")) unlinkSync("src/main.out");

    console.log("Compiling...");
    execSync(compileCommand, { stdio: "inherit" });
    console.log("Compiled successfully!");

    execSync(clearCommand, { stdio: "inherit" });

    console.log("Output:");
    execSync(runCommand, { stdio: "inherit" });
    console.log("\nRan successfully!");

    if (existsSync("src/main.out")) unlinkSync("src/main.out");
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
