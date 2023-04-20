<template>
  <div class="front-page-wrapper">
    <div class="search-container">
      <input
        type="text"
        placeholder="Search by title"
        v-model="searchTerm"
        @input="handleSearch"
      />
    </div>
    <div class="blog-page-wrapper">
      <div v-if="loading">Loading...</div>
      <template v-else>
        <div v-if="currentPosts.length > 0">
          <div
            v-for="post in currentPosts"
            :key="post.id"
            :to="`/${post.id}`"
            class="postLink"
          >
            <div class="blog-card">
              <div class="blog-card-image">
                <img
                  :src="post._embedded['wp:featuredmedia'][0].source_url"
                  :alt="post.title.rendered"
                  style="border-radius: 15px 15px 0 0"
                />
              </div>
              <div class="blog-card-content">
                <h3 class="blog-card-title">{{ post.title.rendered }}</h3>
                <p
                  class="blog-card-excerpt"
                  :style="{ maxHeight: '3em', overflow: 'hidden' }"
                  v-html="post.excerpt.rendered"
                ></p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>No posts found.</div>
      </template>
    </div>
    <pagination
      :postsPerPage="postsPerPage"
      :totalPosts="filteredPosts.length"
      :paginate="paginate"
      :currentPage="currentPage"
    ></pagination>
  </div>
</template>

<script>
import { fetchBlogs } from "../api/blog";
import Pagination from "../pagination/Pagination.vue";

import "../../assets/blog.css";


export default {
  name: "Blog",
  components: {
    Pagination
  },
  data() {
    return {
      blogs: [],
      loading: true,
      currentPage: 1,
      postsPerPage: 12,
      blogPost: null,
      media: null,
      error: null,
      searchTerm: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const blogs = await fetchBlogs();
        console.log("blogs:", blogs);
        this.blogs = blogs;
        this.loading = false;
      } catch (error) {
        console.log("error:", error);
        this.error = true;
      }
    },
    paginate(pageNumber) {
      this.currentPage = pageNumber;
    },
    handleSearch(event) {
      this.searchTerm = event.target.value;
      this.currentPage = 1;
    }
  },
  computed: {
    indexOfLastPost() {
      return this.currentPage * this.postsPerPage;
    },
    indexOfFirstPost() {
      return this.indexOfLastPost - this.postsPerPage;
    },
    filteredPosts() {
      return this.blogs.filter(post =>
        post.title.rendered.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    currentPosts() {
      return this.filteredPosts.slice(this.indexOfFirstPost, this.indexOfLastPost);
    }
  }
};
</script>

<style scoped>
/* Your blog component's styles here */
</style>
