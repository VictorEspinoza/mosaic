const SIZE = 4;
const NAMESPACE = "http://www.w3.org/2000/xmlns/";
const XLINK = "xmlns:xlink";
const W3C = "http://www.w3.org/1999/xlink";

export const getColor = (imageData) => {
  const rgbToHex =(r, g, b) => {
    if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  };

  const hex = "#" + ("000000" + rgbToHex(imageData[0], imageData[1], imageData[2])).slice(-6);
  return hex;
};

export const getUnitsPerDimension = (dimensionSize) => {
  return Math.ceil(dimensionSize / SIZE);
};

const prepareMainSvg = (width, height) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('style', 'border: 1px solid black');
  svg.setAttribute('width', '600');
  svg.setAttribute('height', '250');

  return svg;
};

const prepareCircle = (svgNs, coordinateX, coordinateY, color) => {
  const circle = document.createElementNS(svgNS, 'circle');
   circle.setAttribute('cx', coordinateX);
   circle.setAttribute('cy', coordinateY);
   circle.setAttribute('r', SIZE);
   circle.setAttribute('fill', color);

   return circle;
};


