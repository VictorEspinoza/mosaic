<template>
  <div>
    <h1>Transformation chamber</h1>
    <h2>Canvas</h2>
    <canvas ref="canvas" id="canvas" ></canvas>
    <div>
      <button @click="transform" >mosaiconize</button>
    </div>

    <h2>Transformed</h2>
    <div id="svg_container">

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
      const container = document.getElementById('svg_container');
      while (container.firstChild) container.removeChild(foo.firstChild);
    },
    transform() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      const svg = transform(this.image.width, this.image.height, canvas, context);
      const container = document.getElementById('svg_container');
      container.appendChild(svg);
    }
  },
  data() {
    return {
      imageObject: null
    }
  }
}
</script>

