<template>
  <div class="pagination-wrapper">
    <ul class="pagination">
      <li v-if="currentPage > 1" class="page-item" @click="paginate(currentPage - 1)">
        <button class="page-link">Previous</button>
      </li>
      <li v-for="number in pageNumbers" :key="number" :class="`page-item${currentPage === number ? ' active' : ''}`" @click="paginate(number)">
        <button class="page-link">{{ number }}</button>
      </li>
      <li v-if="currentPage < totalPages" class="page-item" @click="paginate(currentPage + 1)">
        <button class="page-link">Next</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    postsPerPage: {
      type: Number,
      required: true,
    },
    totalPosts: {
      type: Number,
      required: true,
    },
    paginate: {
      type: Function,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    displayRange: {
      type: Number,
      default: 6,
    },
  },
  created() {
    this.paginate(this.currentPage);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalPosts / this.postsPerPage);
    },
    pageNumbers() {
      const numbers = [];
      let startPage = 1;
      let endPage = this.totalPages;

      if (this.totalPages > this.displayRange) {
        const halfDisplay = Math.floor(this.displayRange / 2);
        if (this.currentPage <= halfDisplay) {
          endPage = this.displayRange;
        } else if (this.currentPage + halfDisplay >= this.totalPages) {
          startPage = this.totalPages - this.displayRange + 1;
        } else {
          startPage = this.currentPage - halfDisplay;
          endPage = this.currentPage + halfDisplay;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        numbers.push(i);
      }

      return numbers;
    },
  },
};
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-item {
  margin-right: 0.5rem;
}

.active button {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}
</style>
