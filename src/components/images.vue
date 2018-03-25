<template>
  <div>
    <h1>My images</h1>
    <div v-for="image in images">
      <router-link
        :to="redirectUrl(image.id)">
        <figure class="figure">
          <img
            :src="image.link"
            :alt="image.name"
            class="figure-img rounded"
          />
          <figcaption class="figure-caption text-right">{{image.name}}</figcaption>
        </figure>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'images',
  computed: {
    ...mapState({
      images: state => state.images
    })
  },
  methods: {
    /**
     *
     * @param id {number}
     * @returns {string}
     */
    redirectUrl(id) {
      return `/image/${id}`;
    }
  }
}
</script>
