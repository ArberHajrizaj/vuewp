<template>
  <div>
    <!-- Your component's template goes here -->
    <MyRouter></MyRouter>
  </div>
</template>

<script>
import MyRouter from "./components/router/MyRouter.vue";

export default {
  name: "App",
  components: {
    MyRouter
  }
};
</script>

<style scoped>
/* Your component's scoped styles go here */
</style>
