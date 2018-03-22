import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);



const IMAGES_FETCH = 'IMAGES_FETCH';

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer b90da0cddf3d83336be0939c5142a111198aab33');
   next();
});


export async function loadImages({commit, dispatch}) {
  try {
    const result = await Vue.http.get('https://api.imgur.com/3/account/me/images');
    commit(IMAGES_FETCH, result.data);
  } catch(e) {
    console.log(e, 'error');
  }
}
