
/*
export const generateVerticalSinusoidSVG = (height, sinWidth, sinHeight) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNS, "svg");
    const pathElement = document.createElementNS(svgNS, "path");

    const amplitude = sinWidth * 6;
    const waveLength = sinHeight * 60;
    const numOfWaves = Math.ceil(height / waveLength);
    const halfWaveLength = waveLength / 2;
    let d = `M 0,0 `;

    for (let i = 0; i < numOfWaves; i++) {
        const yStart = i * waveLength;
        const yMid = yStart + halfWaveLength;
        const yEnd = yStart + waveLength;
        
        // Courbe montante
        d += `C ${amplitude / 2} ${yStart}, ${amplitude / 2} ${yMid}, 0 ${yMid} `;
        // Courbe descendante
        d += `C ${-amplitude / 2} ${yMid}, ${-amplitude / 2} ${yEnd}, 0 ${yEnd} `;
    }

    pathElement.setAttribute("d", d);
    svgElement.appendChild(pathElement);

    const svgWidth = amplitude + sinWidth; // Largeur suffisante pour l'amplitude
    svgElement.setAttribute("width", svgWidth);
    svgElement.setAttribute("height", height);
    svgElement.setAttribute("viewBox", `-${amplitude / 2} 0 ${svgWidth} ${height}`);
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgElement.classList.add("sinusoid");

    return svgElement;
};
*/

/*
export const generateVerticalSinusoidSVG = (height, sinWidth, sinHeight) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNS, "svg");
    const pathElement = document.createElementNS(svgNS, "path");

    const waveLength = sinHeight * 40;
    const numOfWaves = Math.ceil(height / waveLength) + 1;
    const amplitude = sinWidth * 10;

    const d = Array.from({ length: numOfWaves }, (_, i) => {
        const startY = i * waveLength;
        const cp1X = amplitude * 2;
        const cp1Y = startY + waveLength / 4;
        const cp2X = 0;
        const cp2Y = startY + waveLength * 3 / 4;
        const endX = amplitude;
        const endY = startY + waveLength;
        return `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
    }).join(' ');

    pathElement.setAttribute("d", `M ${amplitude},0 ${d}`);
    svgElement.appendChild(pathElement);

    svgElement.setAttribute("width", sinWidth * 20); // Width is twice the amplitude to accommodate the full wave
    svgElement.setAttribute("height", height);
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgElement.classList.add("sinusoid");

    return svgElement;
};*/



export const generateVerticalSinusoidSVG = (height, sinWidth, sinHeight) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNS, "svg");
    const pathElement = document.createElementNS(svgNS, "path");
    const frequency = 2 * Math.PI * (sinHeight / height);
    const firstX = sinWidth * Math.sin(0) + sinWidth;
    const precision = height / 200; // too much precision breaks the animation on iOS

    const d = Array.from({ length: height / precision }, (_, y) =>
        `L ${sinWidth * Math.sin(frequency * y * precision) + sinWidth} ${y * precision}`
    ).join(' ');

    pathElement.setAttribute("d", `M ${firstX} 0 ${d}`);
    svgElement.appendChild(pathElement);

    svgElement.setAttribute("width", sinWidth * 2);
    svgElement.setAttribute("height", height);
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgElement.classList.add("sinusoid-background__sinusoid");

    return svgElement;
}
