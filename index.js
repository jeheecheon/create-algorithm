#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectPath = path.resolve(__dirname, "template");
const destPath = process.argv[2] || "algorithm";

(function createProjectDirectory() {
  if (!fs.existsSync(destPath)) {
    try {
      fs.mkdirSync(destPath, { recursive: true });
    } catch (error) {
      console.error("Error creating project directory:", error);
      process.exit(1);
    }
  }
})();

(function validateProjectPath() {
  if (!fs.existsSync(projectPath)) {
    console.error("Error while locating template directory");
    process.exit(1);
  }
})();

(function downloadProject() {
  try {
    fs.readdirSync(srcDir).forEach((file) => {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);

      if (fs.lstatSync(srcFile).isDirectory()) {
        // Create destination directory if it doesn't exist
        fs.mkdirSync(destFile, { recursive: true });
        // Recursively copy files from the source directory to the destination directory
        copyTemplateFiles(srcFile, destFile);
      } else {
        // Copy file
        fs.copyFileSync(srcFile, destFile);
      }
    });
  } catch (error) {
    console.error("Error while downloading template files:", error);
    process.exit(1);
  }
})();

(function installDependencies() {
  try {
    console.log("Installing dependencies...");
    execSync("npm install", { stdio: "inherit", cwd: destPath });
  } catch (error) {
    console.error("Error while installing dependencies:", error);
    process.exit(1);
  }
})();

console.log("Project setup complete!");
