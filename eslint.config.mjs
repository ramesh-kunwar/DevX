// eslint.config.mjs
// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

// IMPORTANT: Put ignores FIRST
export default defineConfig([
    {
        ignores: [
            "**/dist/**",
            "**/node_modules/**",
            "tsconfig.json",
            "eslint.config.mjs",
        ],
    },

    eslint.configs.recommended,
    ...tseslint.configs.recommended,

    {
        rules: {
            "no-console": "off",
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
]);
