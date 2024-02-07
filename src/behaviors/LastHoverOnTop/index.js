import "./LastHoverOnTop.css";

document.querySelectorAll("[x-last-hover-on-top]").forEach((behaviorElement) => {
    const mouseEnterHandler = (event) => {
        behaviorElement.lastHover?.classList.remove("last-hover");
        behaviorElement.lastHover = event.target;
        event.target.classList.add("last-hover");
    };
    Array.from(behaviorElement.children).forEach(
        childrenElement => childrenElement.addEventListener("mouseover", mouseEnterHandler)
    );
});
