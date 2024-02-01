class SvgScrollReveal extends HTMLElement {
  disconnectedCallback() {
    this.scrollCallback &&
      window.removeEventListener("scroll", this.scrollCallback);
  }

  animateOnScroll() {
    queueMicrotask(() => {
      const speed = +(this.getAttribute("data-speed") ?? 1);
      const yOffset = +(this.getAttribute("data-y-offset") ?? 0);

      const path = this.querySelector("path");
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength}`;

      this.scrollCallback &&
        window.removeEventListener("scroll", this.scrollCallback);

      this.scrollCallback = () => {
        const pathBounds = path.getBoundingClientRect();
        const distance = Math.min(0, pathBounds.top - yOffset);
        // if(Math.floor(pathBounds.top) % 2) return;
        const totalDistance = pathBounds.height;
        const percentage = Math.max(-1, (distance / totalDistance) * speed);
        path.style.opacity = Math.min(1, -percentage * 8);
        path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
      };

      this.scrollCallback();
      window.addEventListener("scroll", this.scrollCallback);
    });
  }
}

customElements.define("svg-scroll-reveal", SvgScrollReveal);
