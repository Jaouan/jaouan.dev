import { resolve } from "path";
import { defineConfig } from "vite";
import postcssNesting from "postcss-nesting";
import postcssMixins from "postcss-mixins";
import injectHtmlPlugin from "./plugins/inject-html.plugin";

export default defineConfig({
  plugins: [injectHtmlPlugin],
  css: {
    postcss: {
      plugins: [postcssNesting, postcssMixins],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
