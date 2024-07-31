#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get the destination path from command line argument or default to "algorithm"
const destPath = process.argv[2] || "algorithm";

// Function to copy template files from srcDir to destDir
function copyTemplateFiles(srcDir, destDir) {
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
}

// Create destination directory if it doesn't exist
if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
}

// Define the path to the template directory
const templateDir = path.resolve(__dirname, "template");

// Check if the template directory exists
if (!fs.existsSync(templateDir)) {
  console.error(`Template directory "${templateDir}" does not exist.`);
  process.exit(1);
}

// Copy template files to the destination directory
copyTemplateFiles(templateDir, destPath);

// Install dependencies in the destination directory
console.log("Installing dependencies...");
try {
  execSync("npm install", { stdio: "inherit", cwd: destPath });
} catch (error) {
  console.error("Error installing dependencies:", error);
  process.exit(1);
}

console.log("Project setup complete!");
