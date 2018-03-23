<template>
  <div>
    <h1>Transformation chamber</h1>
    <h2>Canvas</h2>
    <canvas ref="canvas" id="canvas" ></canvas>
    <div>
      <button @click="transform" >mosaiconize</button>
      <button @click="upload" >upload</button>
    </div>

    <h2>Transformed</h2>
    <div id="transformed_container">
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { transform } from '../utils/transformation-helper';

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
    this.cleanSvgContainer();
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
    cleanSvgContainer() {
      const container = document.getElementById('transformed_container');
      while (container.firstChild) container.removeChild(foo.firstChild);
    },
    transform() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      this.svg = transform(this.image.width, this.image.height, canvas, context);
      this.showTransformedPicture();
    },
    showTransformedPicture() {
      const svgData = new XMLSerializer().serializeToString(this.svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        this.imageData = canvas.toDataURL('image/png');
      };

      const container = document.getElementById('transformed_container');
      container.appendChild(img);
    },
    upload() {
      const cropImageInfo = (string) => {
        const parts = string.split(',');
        return parts[1];
      };

      const imageData = {
        image: cropImageInfo(this.imageData),
        title: `${this.image.name}-mosaic`,
        name: `${this.image.name}-mosaic`
      };

      this.$store.dispatch('uploadPicture', imageData);
    }
  },
  data() {
    return {
      imageObject: null,
      svg: null,
      imageData: null
    }
  }
}
</script>

