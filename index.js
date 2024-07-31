#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get the destination path
const destPath = process.argv[2] || "backjoon";

// Copy template files to destination
function copyTemplateFiles(srcDir, destDir) {
  fs.readdirSync(srcDir).forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    if (fs.lstatSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile, { recursive: true });
      copyTemplateFiles(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

// Create destination directory if it doesn't exist
if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
}

// Copy template files
const templateDir = path.join(__dirname, "template");
copyTemplateFiles(templateDir, destPath);

console.log("Project setup complete!");
