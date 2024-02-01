import { defineConfig } from "vite";
import postcssNesting from "postcss-nesting";
import postcssMixins from "postcss-mixins";

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting, postcssMixins],
    },
  },
});
