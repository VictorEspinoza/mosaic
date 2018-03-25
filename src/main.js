import Toasted from 'vue-toasted';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import settings from './utils/toast-settings';

Vue.config.productionTip = false;
Vue.use(Toasted, settings);

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
