// @ts-check
import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import prettier from "eslint-config-prettier"
import astro from "eslint-plugin-astro"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["dist/", ".astro/", ".wrangler/", "node_modules/", "public/"]),

  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs["flat/recommended"],

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      // proibido any
      "@typescript-eslint/no-explicit-any": "error",

      // proibido declarar e não usar (prefixo _ libera de propósito)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // imports: ordenados e sem duplicados
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"], // side effects: import "x"
            ["^node:"], // módulos do Node
            ["^@?\\w"], // pacotes
            [
              "^@(components|layouts|assets|data|lib|styles|typings|i18n)(/.*|$)",
            ], // aliases do projeto
            ["^\\."], // relativos
            ["\\.css$"], // estilos
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
    },
  },

  // Prettier cuida de aspas, ponto e vírgula e espaçamento: sempre por último
  prettier,
])
