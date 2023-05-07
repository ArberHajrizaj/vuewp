import { createApp } from "vue";
import App from "./App.vue";
import router from "./components/router/index";

import './assets/index.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


const app = createApp(App);
app.use(router);

app.mount("#app");
