class VisibilityAware extends HTMLElement {
    elementToObserve;
    observer;

    constructor() {
        super();
        this.elementToObserve = this.getAttribute('data-selector') ? document.querySelector(this.getAttribute('data-selector')) : this;
        const animationCssClass = this.getAttribute('data-class') ?? "is-visible";
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.isIntersecting ? this.classList.add("already-been-visible", animationCssClass) : this.classList.remove(animationCssClass)
            });
        }, { root: null, threshold: 0 });
    }

    connectedCallback() {
        this.observer.observe(this.elementToObserve);
    }

    disconnectedCallback() {
        this.observer.unobserve(this.elementToObserve);
    }
}

customElements.define('visibility-aware', VisibilityAware);
