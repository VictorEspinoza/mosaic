import Vue from 'vue'
import Router from 'vue-router'
import images from '@/components/images'
import transformationChamber from '@/components/transformation-chamber';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: images
    },
    {
      path: '/image/:id',
      name: 'detail',
      component: transformationChamber
    }
  ]
});

export default router;
