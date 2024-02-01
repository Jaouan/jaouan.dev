import styleCss from "./ThemeToggle.css?raw";

class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleElement = document.createElement('style');
    styleElement.textContent = styleCss;

    this.buttonElement = document.createElement('button');
    this.buttonElement.setAttribute('aria-label', 'Toggle theme');
    this.buttonElement.className = this.getCurrentTheme();

    this.shadowRoot.append(styleElement, this.buttonElement);

    document.documentElement.setAttribute('data-theme', this.getCurrentTheme());

    this.toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
  }

  connectedCallback() {
    this.buttonElement.addEventListener('click', this.toggleTheme);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener('click', this.toggleTheme);
  }

  getCurrentTheme() {
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)') ? "dark" : "light";
    return localStorage.getItem("theme") ?? preferredTheme;
  }

}

customElements.define('theme-toggle', ThemeToggle);