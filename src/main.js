import { inject } from '@vercel/analytics';
import "./components"
import "./styles"
 
inject();

const stickyHeroElement = document.querySelector(".hero--sticky");
const heroElement = document.querySelector('.hero');
stickyHeroElement.innerHTML = heroElement.innerHTML;
