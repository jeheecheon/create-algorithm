const { execSync } = require("child_process");
const os = require("os");

const platform = os.platform();
const isWindows = platform === "win32";
const compileCommand = "g++ -o src/main.out src/main.cpp";
const runCommand = isWindows ? "src\\main.out < src\\input.txt" : "./src/main.out < src/input.txt";

try {
    console.log("Compiling...");
    execSync(compileCommand, { stdio: "inherit" });
    console.log("Compiled successfully!");
    
    console.log("Running...\n");
    execSync(runCommand, { stdio: "inherit" });
    console.log("");
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
