import { readFileSync } from "fs";
import { resolve } from "path";
import Handlebars from "handlebars";

const readHtml = (filePath) =>
  readFileSync(resolve(__dirname, filePath), { encoding: "utf8" });

Handlebars.registerHelper('urlify', (input) =>
  input.replace(/[\s&\/]/g, "-").replace(/-+/g, "-").toLowerCase()
);

export default ({ partialsPath, data }) => ({
  name: "html-inject-partials",
  transformIndexHtml(html) {
    return Handlebars.compile(html.replace(/{{\$> (.*?) }}/g, (_, partial) => {
      try {
        return readHtml(`${partialsPath}/${partial}/${partial}.partial.hbs`);
      } catch (e) {
        console.error(e);
        throw new Error(`💥 Error while injecting partial: ${partial}`);
      }
    }))(data);
  },
});
