// import { createApp } from "vue";
// import App from "./App.vue";
// import router from './components/router/myRouter' 

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/blog.css"; 

// // require('dotenv').config()


// // Create a Vue app instance
// const app = createApp(App);

// // set up the router
// app.use(router)

// // Mount the Vue app instance to the DOM
// app.mount("#root");


import { createApp } from 'vue'
import App from './App.vue'
import router from './components/router/MyRouter.vue'

const app = createApp(App)

// set up the router
app.use(router)

// register the router-view component
app.component('router-view', router)

app.mount('#root')

