<template>
  <div>
    <!-- Your component's template goes here -->
    <router-view></router-view>
  </div>
</template>

<script>
import router from "./components/router/index";


export default {
  name: "App",
  router
};
</script>

<style scoped>
/* Your component's scoped styles go here */
</style>
