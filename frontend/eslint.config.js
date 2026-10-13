import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importX from "eslint-plugin-import-x";
import unusedImports from "eslint-plugin-unused-imports";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["node_modules/**", "build.mjs", "eslint.config.js"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
      "import-x": importX,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    settings: {
      // Preact uses the `h` pragma; pin a version so the react plugin does not
      // try (and fail) to auto-detect a React install.
      react: { pragma: "h", fragment: "Fragment", version: "18.0" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Preact: no React import needed, no prop-types, allow custom-element attrs.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      // Unused imports are auto-removed on `--fix`; the base rule only reports,
      // so hand it off to unused-imports (imports fixable, other vars reported).
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
      // Allow `declare module "preact" { namespace JSX { … } }` — the standard
      // way to register custom elements (ha-card, ha-icon) as JSX intrinsics.
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
      // Sort imports/exports and merge duplicate imports from the same module.
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import-x/no-duplicates": "error",
    },
  },
  // Must be last: enables `prettier/prettier` and disables ESLint rules that
  // would conflict with Prettier's formatting. `eslint --fix` now formats too.
  prettierRecommended
);
