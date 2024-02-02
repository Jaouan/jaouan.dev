import { readFileSync } from "fs";
import { resolve } from "path";

const readHtml = (filePath) =>
  readFileSync(resolve(__dirname, filePath), { encoding: "utf8" });

export default {
  name: "html-auto-inject",
  transformIndexHtml(html) {
    return html.replace(/<!-- inject:(.*?) -->/g, (_, partial) => {
      try {
        return readHtml(`../src/content/${partial}/${partial}.partial.html`);
      } catch (e) {
        console.error(e);
        throw new Error(`💥 Error while injecting partial: ${partial}`);
      }
    });
  },
};
