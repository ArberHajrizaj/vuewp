<template>
  <router-view></router-view>
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router'
import Blog from "../pages/blog.vue";
import SinglePost from "../pages/singlePost.vue";

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/:id',
    name: 'SinglePost',
    component: SinglePost
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default {
  name: "MyRouter",
  router
};
</script>
