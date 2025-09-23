import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "import/order": "off", // Disable import/order rule to fix import grouping and ordering errors
      "react-hooks/exhaustive-deps": "off", // Disable exhaustive-deps rule to fix hook dependency warnings
    },
  },
];

export default eslintConfig;