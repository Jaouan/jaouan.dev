import { ResizeObserverDebounced } from "./DebouncedResizeObserver";
import { generateVerticalSinusoidSVG } from "./sinusoid-generator";

import "./SinusoidBackground.css";

const CHANGE_THRESHOLD = 0.05;

class SinusoidBackground extends HTMLElement {
  connectedCallback() {
    const children = Array.from(this.children);
    const [firstChildren] = children;

    const sinWidth = +this.getAttribute("data-sin-width") || 80;
    const sinHeight = +this.getAttribute("data-sin-height") || 4;

    const overlayElement = document.createElement("div");
    overlayElement.classList.add("sinusoid-background__overlay");

    const svgScrollRevealElement = document.createElement("svg-scroll-reveal");
    svgScrollRevealElement.setAttribute(
      "data-speed",
      this.getAttribute("data-speed") || 1,
    );
    svgScrollRevealElement.setAttribute(
      "data-y-offset",
      this.getAttribute("data-y-offset") || 0,
    );
    overlayElement.appendChild(svgScrollRevealElement);

    overlayElement.append(...children);
    this.appendChild(overlayElement);

    this.elementToObserve = firstChildren;

    this.observer = new ResizeObserverDebounced({
      resizingCallback: (entries) =>
        entries.forEach((_) => this.classList.remove("ready")),
      resizedCallback: (entries) =>
        entries.forEach((entry) => {
          const height = entry.contentRect.height;
          if (
            !this.lastHeight ||
            Math.abs(this.lastHeight / height - 1) > CHANGE_THRESHOLD
          ) {
            this.lastHeight = height;
            svgScrollRevealElement.innerHTML = "";
            svgScrollRevealElement.appendChild(
              generateVerticalSinusoidSVG(height, sinWidth, sinHeight),
            );
            svgScrollRevealElement.animateOnScroll();
          }
          this.classList.add("ready");
        }),
    });
    this.observer.observe(this.elementToObserve);
  }

  disconnectedCallback() {
    this.observer.unobserve(this.elementToObserve);
  }
}

customElements.define("sinusoid-background", SinusoidBackground);
