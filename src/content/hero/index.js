import "./hero.css";

const cloneHeroToStickyHero = () => {
  const [stickyHeroElement] = document.getElementsByClassName("hero--sticky");
  const [heroElement] = document.getElementsByClassName("hero");
  stickyHeroElement.innerHTML = heroElement.innerHTML;
};

cloneHeroToStickyHero();
