import Toasted from 'vue-toasted';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(Toasted, {position: 'top-right', duration: 4000, type: 'info', theme: 'bubble', singleton: true});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted() {
    this.$store.dispatch('loadImages', {});
  }
});
