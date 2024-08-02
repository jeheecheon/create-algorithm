import { fileURLToPath } from "url";
import path from "path";

export const isWindows = process.platform === "win32";
export const __filename = fileURLToPath(import.meta.url);
export const currentDir = path.dirname(__filename);
export const parentDir = path.dirname(currentDir);

export const srcDir = path.join(parentDir, "src");
