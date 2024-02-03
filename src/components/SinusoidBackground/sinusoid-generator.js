export const generateVerticalSinusoidSVG = (height, sinWidth, sinHeight) => {
  const svgNS = "http://www.w3.org/2000/svg";
  const svgElement = document.createElementNS(svgNS, "svg");
  const pathElement = document.createElementNS(svgNS, "path");
  const frequency = 2 * Math.PI * (sinHeight / height);
  const firstX = sinWidth * Math.sin(0) + sinWidth;
  const precision = height / 200; // too much precision breaks the animation on iOS

  const d = Array.from(
    { length: height / precision },
    (_, y) =>
      `L ${sinWidth * Math.sin(frequency * y * precision) + sinWidth} ${y * precision}`,
  ).join(" ");

  pathElement.setAttribute("d", `M ${firstX} 0 ${d}`);
  svgElement.appendChild(pathElement);

  svgElement.setAttribute("width", sinWidth * 2);
  svgElement.setAttribute("height", height);
  svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svgElement.classList.add("sinusoid-background__sinusoid");

  return svgElement;
};
