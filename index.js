#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const srcPath = path.resolve(__dirname, "template");
const destPath = process.argv[2] || "algorithm";

(function validateTemplatePath({ templatePath }) {
  if (!fs.existsSync(templatePath)) {
    console.error("Error while locating template directory");
    process.exit(1);
  }
})({
  templatePath: srcPath,
});

(function createProjectDirectory({ projectPath }) {
  if (fs.existsSync(projectPath)) {
    console.log("Project directory already exists. Exiting...");
    process.exit(1);
  }

  try {
    fs.mkdirSync(projectPath, { recursive: true });
  } catch (error) {
    console.error("Error creating project directory:", error);
    process.exit(1);
  }
})({
  projectPath: destPath,
});

(function downloadProject({ projectPath, destPath }) {
  try {
    fs.readdirSync(projectPath).forEach((fileName) => {
      const srcFilePath = path.join(projectPath, fileName);
      const destFilePath = path.join(destPath, fileName);

      if (fs.lstatSync(srcFilePath).isDirectory()) {
        fs.mkdirSync(destFilePath, { recursive: true });
        downloadProject({
          projectPath: srcFilePath,
          destPath: destFilePath,
        });
      } else {
        fs.copyFileSync(srcFilePath, destFilePath);
      }
    });
  } catch (error) {
    console.error("Error while downloading template files:", error);
    process.exit(1);
  }
})({
  projectPath: srcPath,
  destPath,
});

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
