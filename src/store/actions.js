import Vue from 'vue';
import router  from '../router/index';
import VueResource from 'vue-resource';
Vue.use(VueResource);

const IMAGES_FETCH = 'IMAGES_FETCH';


const DESCRIPTION = 'transformed';

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer b90da0cddf3d83336be0939c5142a111198aab33');
   next();
});

export async function loadImages({commit}) {
  try {
    const result = await Vue.http.get('https://api.imgur.com/3/account/me/images');
    commit(IMAGES_FETCH, result.data);
  } catch(e) {
    console.log(e, 'error');
  }
}

export async function uploadPicture({commit}, {image, title, name}) {
  try {
    const imageData = {
      image,
      album: '',
      title,
      description: DESCRIPTION,
      name
    };
    const result = await Vue.http.post('https://api.imgur.com/3/image', imageData);
    router.push({ path: '/' })
  } catch (e) {
    console.log(e, 'error when uploading image');
  }
}
