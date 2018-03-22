<template>
  <div>
    <h1>Transformation chamber</h1>
    <h2>Canvas</h2>
    <canvas width="640" height="426" ref="canvas" id="canvas" ></canvas>
    <h2>Transformed - to be done</h2>

  </div>
</template>

<script>
import { mapState } from 'vuex';

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

    imageObj.onload = function () {
      context.drawImage(imageObj, 69, 50);
    };
    imageObj.src = this.image.link;
  }
}
</script>

