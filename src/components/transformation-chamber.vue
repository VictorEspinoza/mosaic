<template>
  <div>
    <h1>Transformation chamber</h1>
    <h2>Canvas</h2>
    <canvas ref="canvas" id="canvas" ></canvas>
    <div>
      <button @click="transform" >mosaiconize</button>
    </div>

    <h2>Transformed</h2>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUnitsPerDimension } from '../utils/transformation-helper';

export default {
  name: 'transformationChamber',
  computed: {
    ...mapState({
      images: state => state.images
    }),
    image() {
      const {id} = this.$route.params;
      const image = this.images.find((image) => image.id === id);
      return image;
    }
  },
  mounted() {
    const canvas = this.$refs.canvas;
    const context = canvas.getContext('2d');
    const imageObj = new Image();
    imageObj.crossOrigin = "Anonymous";

    imageObj.onload = () => {
      canvas.width = imageObj.width;
      canvas.height = imageObj.height;
      context.drawImage(imageObj, 0, 0);
      this.imageObject = imageObj;
    };
    imageObj.src = this.image.link;
  },
  methods: {

    transform() {
      const rows = getUnitsPerDimension(this.imageObject.height);
      const cols = getUnitsPerDimension(this.imageObject.width);

      const rgbToHex =(r, g, b) => {
        if (r > 255 || g > 255 || b > 255)
          throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
      };

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const svgNS = svg.namespaceURI;
      svg.setAttribute('style', 'border: 1px solid black');
      svg.setAttribute('width', this.imageObject.width);
      svg.setAttribute('height', this.imageObject.height);

      let yCoordinate = 0;
      let xCoordinate = 0;


      for (let i = 0; i <= cols; i++) {

        for (let j = 0; j <= rows; j++) {
          const canvas = this.$refs.canvas;
          const context = canvas.getContext('2d');

          const data = context.getImageData(yCoordinate, xCoordinate, 4, 4).data;
          const hex = "#" + ("000000" + rgbToHex(data[0], data[1], data[2])).slice(-6);

          const circle = document.createElementNS(svgNS, 'circle');
          circle.setAttribute('cx', yCoordinate);
          circle.setAttribute('cy', xCoordinate);
          circle.setAttribute('r', 4);
          circle.setAttribute('fill', hex);

          svg.appendChild(circle);
          xCoordinate += 4;
        }

        yCoordinate += 4;
        xCoordinate = 0;
      }
      document.body.appendChild(svg);
    }


  },
  data() {
    return {
      imageObject: null
    }
  }
}
</script>

