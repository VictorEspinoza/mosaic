<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Mosaicnator 5000</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/">
              <a class="nav-link" href="#">Home</a>
            </router-link>
          </li>
          <li
            v-if="show_image_detail_item"
            class="nav-item">
            <a class="nav-link" href="#">Image detail</a>
          </li>
        </ul>
      </div>
    </nav>

      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    show_image_detail_item() {
      return this.$route.name === 'detail';
    }
  }
}
</script>
