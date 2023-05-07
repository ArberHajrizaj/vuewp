// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './components/router/myRouter.vue'

// const app = createApp(App)

// // set up the router
// app.use(router)

// app.mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Blog from './components/Blog.vue'
import SinglePost from './components/SinglePost.vue'
import Search from './components/Search.vue'

// define your routes
const routes = [
  { path: '/', component: Blog },
  { path: '/post/:id', component: SinglePost },
  { path: '/search', component: Search }
]

// create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// create the app instance
const app = createApp(App)

// use the router instance
app.use(router)

// mount the app
app.mount('#app')
