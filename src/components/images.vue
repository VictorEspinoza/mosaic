<template>
  <div>
    <h1>My album</h1>
    <ul>
      <li v-for="image in images">
        <router-link :to="redirectUrl(image.id)">
          <img
            :src="image.link"
            :alt="image.name"
          />
        </router-link>
      </li>
    </ul>
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
    redirectUrl(id) {
      return `/image/${id}`;
    }
  }
}
</script>
