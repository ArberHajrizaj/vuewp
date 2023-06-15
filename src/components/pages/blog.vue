<template>
  <div class="front-page-wrapper">
    <div class="search-container">
      <input type="text" placeholder="Search by title" v-model="searchTerm" @input="handleSearch" />
    </div>
    <div class="blog-page-wrapper">
      <div v-if="loading">Loading...</div>
      <div v-else-if="currentPosts.length > 0">
        <router-link v-for="post in currentPosts" :key="post.id" :to="`/${post.id}`" class="postLink">
          <div class="blog-card">
            <div class="blog-card-image">
              <img :src="post._embedded['wp:featuredmedia'][0].source_url" :alt="post.title.rendered"
                style="border-radius: 15px 15px 0 0" />
            </div>
            <div class="blog-card-content">
              <h3 class="blog-card-title">{{ post.title.rendered }}</h3>
              <p class="blog-card-excerpt" :style="{ maxHeight: '3em', overflow: 'hidden' }"
                v-html="post.excerpt.rendered"></p>
            </div>
          </div>
        </router-link>
      </div>
      <div v-else>No posts found.</div>
    </div>
    <Pagination :postsPerPage="postsPerPage" :totalPosts="filteredPosts.length" :paginate="paginate"
      :currentPage="currentPage" />
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue';
import { fetchBlogs } from '@/components/api/blog.js';
import Pagination from '../pagination/Pagination.vue';

import '../../assets/blog.css';
import '../../assets/index.css';

export default {
  components: {
    Pagination,
  },
  setup() {
    const loading = ref(true);
    const currentPage = ref(1);
    const postsPerPage = ref(12);
    const error = ref(null);
    const searchTerm = ref('');
    const filteredPosts = ref([]);
    const blogs = ref([]);

    const fetchData = async () => {
      try {
        const data = await fetchBlogs();
        blogs.value = data;
        filteredPosts.value = data;
        loading.value = false;
        updateCurrentPosts();
      } catch (err) {
        error.value = true;
      }
    };


    onMounted(() => {
      fetchData();
    });

    watch([currentPage, postsPerPage, filteredPosts], () => {
      updateCurrentPosts();
    });

    const paginate = (pageNumber) => {
      currentPage.value = pageNumber;
    };

    const handleSearch = (event) => {
      searchTerm.value = event.target.value;
      currentPage.value = 1;
      filteredPosts.value = blogs.value.filter((post) =>
        post.title.rendered.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    };

    const currentPosts = ref([]);

    const updateCurrentPosts = () => {
      const indexOfLastPost = currentPage.value * postsPerPage.value;
      const indexOfFirstPost = indexOfLastPost - postsPerPage.value;
      currentPosts.value = filteredPosts.value.slice(indexOfFirstPost, indexOfLastPost);
    };

    return {
      loading,
      currentPage,
      postsPerPage,
      error,
      searchTerm,
      filteredPosts,
      blogs,
      currentPosts,
      paginate,
      handleSearch,
    };
  }
};
</script>
