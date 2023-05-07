<template>
  <div class="pagination-wrapper">
    <ul class="pagination">
      <li v-if="currentPage > 1" class="page-item" @click="paginate(currentPage - 1)">
        <button class="page-link">Previous</button>
      </li>

      <li v-for="number in pageNumbers" :key="number"
        :class="['page-item', currentPage === number ? 'active' : '']"
        @click="paginate(number)">
        <button class="page-link">{{ number }}</button>
      </li>

      <li v-if="currentPage < totalPages" class="page-item" @click="paginate(currentPage + 1)">
        <button class="page-link">Next</button>
      </li>
    </ul>
  </div>
</template>

<script>
import '../../assets/pagination.css';

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

  
  computed: {
    
    pageNumbers() {
      const pageNumbers = [];
      const totalPages = Math.ceil(this.totalPosts / this.postsPerPage);
      let startPage = 1;
      let endPage = totalPages;
      if (totalPages > this.displayRange) {
        const halfDisplay = Math.floor(this.displayRange / 2);
        if (this.currentPage <= halfDisplay) {
          endPage = this.displayRange;
        } else if (this.currentPage + halfDisplay >= totalPages) {
          startPage = totalPages - this.displayRange + 1;
        } else {
          startPage = this.currentPage - halfDisplay;
          endPage = this.currentPage + halfDisplay;
        }
      }
      console.log("startPage: ", startPage);
      console.log("endPage: ", endPage);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      console.log("Page Numbers: ", pageNumbers);
      return pageNumbers;
    },
    totalPages() {
      return Math.ceil(this.totalPosts / this.postsPerPage);
    },
    
  },
};


</script>


