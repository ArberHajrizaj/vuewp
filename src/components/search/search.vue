<template>
  <form @submit.prevent="handleSearch">
    <input type="text" placeholder="Search posts..." v-model="searchQuery" />
    <button type="submit">Search</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>
