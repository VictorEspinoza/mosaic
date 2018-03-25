import Vue from 'vue';
import router  from '../router/index';
import VueResource from 'vue-resource';
Vue.use(VueResource);

const IMAGES_FETCH = 'IMAGES_FETCH';

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
    Vue.toasted.show('Error when loading your images, please try later', {type: 'error'});

  }
}

export async function uploadPicture({commit}, {image, title, name, description}) {
  try {
    const imageData = {
      image,
      album: '',
      title,
      description,
      name
    };
    const result = await Vue.http.post('https://api.imgur.com/3/image', imageData);
    Vue.toasted.show('Image is saved');
    router.push({ path: '/' })
  } catch (e) {
    console.log(e, 'error when uploading image');
    Vue.toasted.show('Error when uploading your image', {type: 'error'});
  }
}
