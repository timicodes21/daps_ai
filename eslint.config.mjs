import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  // Ignore build, output, and generated folders
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "eslint.config.mjs"
    ]
  },

  // JavaScript base rules
  js.configs.recommended,

  // Extend legacy configs using compat
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended" // this replaces the separate plugin & rule
  ),

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "jsx-a11y": jsxA11y,
      prettier: prettierPlugin
    },
    rules: {
      // Optional: extend additional recommended rules from plugin
      ...tsPlugin.configs["recommended-type-checked"].rules,

      // Custom overrides
      "prettier/prettier": ["error", { trailingComma: "none" }],
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/no-throw-literal": "off",
      "import/no-extraneous-dependencies": "off",
      "react/jsx-props-no-spreading": "off",
      "import/prefer-default-export": "off",
      "react/require-default-props": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "no-console": [
        2,
        {
          allow: ["warn", "error"]
        }
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function"
        }
      ],

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never"
        }
      ],
      "@typescript-eslint/no-unused-vars": ["warn"],
      "jsx-a11y/anchor-is-valid": "off" // Next.js handles this via next/link
    }
  }
];
