// Hardcoded size of the square copied from the source image
const SIZE = 16;

/**
 * Counts how many rows or colums will be needed to render generated mosaic image
 *
 * @param dimensionSize {number}
 * @returns {number}
 */
const getUnitsPerDimension = (dimensionSize) => {
  return Math.ceil(dimensionSize / SIZE);
};

/**
 * Main method of the transformation logic return prepared svg element with generated image
 *
 * @param width {number}
 * @param height {number}
 * @param canvas {Element}
 * @param context {object}
 * @returns {Element}
 */
export const transform = (width, height, canvas, context) => {
  const svg = prepareMainSvg(width, height);
  return createMosaic(width, height, canvas, context, svg);
};
/**
 * Prepares the main svg part the container for the dots
 *
 * @param width {number}
 * @param height {number}
 * @returns {Element}
 */
const prepareMainSvg = (width, height) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('style', 'border: 1px solid black');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  return svg;
};

/**
 * According to values generates hexadecimal representation of main color for selected area of a source image
 *
 * @param r {number}
 * @param g {number}
 * @param b {number}
 * @returns {string}
 */
const rgbToHex =(r, g, b) => {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
};

/**
 * Goes through the rows and images and step by step reads the source image parts. Based on that creates the svg circle
 * representation of dominant color.
 *
 * @param width {number}
 * @param height {number}
 * @param canvas {Element}
 * @param context {object}
 * @param svg {Element
 * @returns {Element}
 */
const createMosaic = (width, height, canvas, context, svg) => {
  const svgNS = svg.namespaceURI;
  const rows = getUnitsPerDimension(height);
  const cols = getUnitsPerDimension(width);

  let yCoordinate = 0;
  let xCoordinate = 0;

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const data = context.getImageData(yCoordinate, xCoordinate, SIZE, SIZE).data;
      const colorHex = "#" + ("000000" + rgbToHex(data[0], data[1], data[2])).slice(-6);
      const circle = prepareCircle(svgNS, yCoordinate, xCoordinate, colorHex);
      svg.appendChild(circle);
      xCoordinate += SIZE;
    }
    yCoordinate += SIZE;
    xCoordinate = 0;
  }
  return svg;
};

/**
 *
 * @param svgNS
 * @param yCoordinate
 * @param xCoordinate
 * @param colorHex
 * @returns {Element}
 */

/**
 * Prepares colored svg circle.
 *
 * @param svgNS {string}
 * @param yCoordinate {number}
 * @param xCoordinate {number}
 * @param colorHex {string}
 * @returns {Element}
 */
const prepareCircle = (svgNS, yCoordinate, xCoordinate, colorHex) => {
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', yCoordinate);
  circle.setAttribute('cy', xCoordinate);
  circle.setAttribute('r', SIZE / 2);
  circle.setAttribute('fill', colorHex);

  return circle;
};


