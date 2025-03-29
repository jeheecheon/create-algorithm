import path from "path";
import { fileURLToPath } from "url";

export const getIsWindows = () => process.platform === "win32";

const __filename = fileURLToPath(import.meta.url);
const utilsPath = path.dirname(__filename);
const projectPath = path.dirname(utilsPath);
export const getSrcPath = () => path.join(projectPath, "src");
