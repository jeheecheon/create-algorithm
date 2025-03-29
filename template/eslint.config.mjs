import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    {
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            "@typescript-eslint/no-var-requires": [
                "error",
                {
                    allow: ["fs"],
                },
            ],
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
];
