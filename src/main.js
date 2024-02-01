import "./components"
import "./styles"

const stickyHeroElement = document.querySelector(".hero--sticky");
const heroElement = document.querySelector('.hero');
stickyHeroElement.innerHTML = heroElement.innerHTML;
