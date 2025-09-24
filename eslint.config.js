import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(globalIgnores(["dist"]), {
  files: ["**/*.{ts,tsx}"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs["recommended-latest"],
    reactRefresh.configs.vite,
    prettierConfig,
  ],
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react$", "^react-dom$"],

          ["^react-router"],

          ["^@?\\w"],

          ["^(@|~)(/.*|$)"],

          ["^\\.\\."],

          ["^\\."],

          ["^.+\\.(css|scss|sass|less)$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
   
  },
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
});
