import { createRouter, createWebHistory } from 'vue-router';
import Blog from '../pages/Blog.vue';
import SinglePost from '../pages/singlePost.vue';

const routes = [
  { path: '/', component: Blog },
  { path: '/:id', component: SinglePost, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
