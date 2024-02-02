import styleCss from "./LiquidButton.css?raw";
import { LiquidButtonSvg } from "./liquid-button-svg";

class LiquidButtonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = styleCss;

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "liquid-button-wrapper");

    const svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    svgElement.setAttribute("class", "liquid-button");
    svgElement.dataset.width = this.getAttribute("data-width") || 200;
    svgElement.dataset.height = this.getAttribute("data-height") || 50;
    svgElement.dataset.color1 = this.getAttribute("data-color1") || "#FFF";
    svgElement.dataset.color2 =
      this.getAttribute("data-color2") || "hsl(160, 55%, 59%)";
    svgElement.dataset.color3 =
      this.getAttribute("data-color3") || "hsl(160, 55%, 59%)";

    const aElement = document.createElement("a");
    aElement.href = this.getAttribute("href") || "#";
    aElement.style.lineHeight = svgElement.dataset.height + "px";
    aElement.style.textDecoration = "none";
    aElement.style.color = this.getAttribute("data-text-color") || "black";
    if (this.hasAttribute("x-scroll-to-top")) {
      aElement.onclick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    }
    const slot = document.createElement("slot");
    aElement.appendChild(slot);

    wrapper.appendChild(svgElement);
    wrapper.appendChild(aElement);

    const liquidButton = new LiquidButtonSvg(svgElement);
    this.addEventListener("mousemove", liquidButton.mouseHandler);
    this.addEventListener("mouseout", liquidButton.clearHandler);

    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define("liquid-button", LiquidButtonElement);
