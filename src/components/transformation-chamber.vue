<template>
  <div>
    <h2>Source</h2>
    <div class="row">
      <canvas ref="canvas" id="canvas" ></canvas>
    </div>

    <div class="row mt-2">
      <button
        v-if="is_transformable"
        @click="transform"
        class="btn btn-primary">
        Create mosaic
      </button>
    </div>

    <div v-show="showResult">
      <h2>Transformed</h2>
      <div class="row">
        <div id="transformed_container"></div>
      </div>

      <div class="row mt-2">
        <button
          class="btn btn-primary"
          @click="upload" >upload
        </button>
      </div>
    </div>

    <div class="row mt-2">
      <router-link to="/">
        <button class="btn btn-secondar">Back</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { transform } from '../utils/transformation-helper';

const DESCRIPTION = 'transformed';

export default {
  name: 'transformationChamber',
  computed: {
    ...mapState({
      images: state => state.images
    }),
    is_transformable() {
      return this.image.description !== DESCRIPTION;
    },
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
      this.showResult = true;
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
        name: `${this.image.name}-mosaic`,
        description: DESCRIPTION
      };

      this.$store.dispatch('uploadPicture', imageData);
    }
  },
  data() {
    return {
      imageObject: null,
      svg: null,
      imageData: null,
      showResult: false
    }
  }
}
</script>

