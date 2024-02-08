import { resolve } from "path";
import { defineConfig } from "vite";
import postcssNesting from "postcss-nesting";
import postcssMixins from "postcss-mixins";
import htmlInjectPartials from "./plugins/html-inject-partials.plugin";
import { readFileSync } from "fs";
import yaml from "js-yaml";

export default defineConfig({
  plugins: [htmlInjectPartials({
    partialsPath: resolve(__dirname, "./src/partials"),
    data: yaml.load(readFileSync('./content.yml', 'utf8'))
  })],
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
