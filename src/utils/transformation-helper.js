const SIZE = 16;

export const getUnitsPerDimension = (dimensionSize) => {
  return Math.ceil(dimensionSize / SIZE);
};

export const transform = (width, height, canvas, context) => {
  const svg = prepareMainSvg(width, height);
  return createMosaic(width, height, canvas, context, svg);
};

const prepareMainSvg = (width, height) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('style', 'border: 1px solid black');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  return svg;
};

const rgbToHex =(r, g, b) => {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
};

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


const prepareCircle = (svgNS, yCoordinate, xCoordinate, colorHex) => {
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', yCoordinate);
  circle.setAttribute('cy', xCoordinate);
  circle.setAttribute('r', SIZE / 2);
  circle.setAttribute('fill', colorHex);

  return circle;
};


