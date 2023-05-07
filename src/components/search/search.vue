<template>
  <form @submit.prevent="handleSearch">
    <input
      type="text"
      placeholder="Search posts..."
      v-model="searchQuery"
      @input="handleInputChange"
    />
    <button type="submit">Search</button>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    handleSearch(event) {
      event.preventDefault();
      this.$emit("search", this.searchQuery);
    },
    handleInputChange(event) {
      this.searchQuery = event.target.value;
    }
  },
  created() {
    this.searchQuery = this.$route.query.q || '';
  },
};
</script>
