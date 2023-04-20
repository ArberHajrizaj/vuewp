<template>
  <div class="single-post container">
    <div v-if="blog">
      <div v-if="featuredMedia" class="featured-image">
        <img :src="featuredMedia.source_url" :alt="featuredMedia.alt_text" />
      </div>
      <div class="content">
        <h1 class="post-title">{{ blog.title.rendered }}</h1>
        <div v-html="blog.content.rendered"></div>
      </div>
    </div>

    <div class="comments">
      <h2>Comments</h2>
      <p v-if="comments.length === 0">No comments for this post.</p>
      <div v-else>
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <h3>{{ comment.author_name }}</h3>
          <div v-html="comment.content.rendered"></div>
        </div>
      </div>
    </div>

    <button class="add-post-button" @click="showAddPostForm = true">
      Add new Post
    </button>

    <div v-if="showAddPostForm" class="add-post-form-container">
      <form @submit.prevent="handleAddPostFormSubmit" class="add-post-form" enctype="multipart/form-data">
        <h2>Add New Post</h2>
        <input type="text" placeholder="Title" v-model="newPostData.title" />
        <textarea placeholder="Content" v-model="newPostData.content"></textarea>
        <input type="file" accept="image/*" @change="handleFileChange" />
        <button type="submit">Submit</button>
        <button type="button" @click="cancelAddPostForm">Cancel</button>
      </form>
    </div>
  </div>
</template>

  
<script>
import { fetchSingleBlogPost, fetchMedia, fetchComments, addNewPost } from "../api/blog";
import "../../assets/single-post.css";

export default {
  data() {
    return {
      blog: null,
      featuredMedia: null,
      comments: [],
      showAddPostForm: false,
      newPostData: { title: "", content: "", featuredMedia: null }
    };
  },
  methods: {
    async fetchData() {
      const { data } = await fetchSingleBlogPost(this.$route.params.id);
      this.blog = data;
      if (data && data.featured_media) {
        const mediaData = await fetchMedia(data.featured_media);
        this.featuredMedia = mediaData.data;
      }
      const commentsData = await fetchComments(this.$route.params.id);
      this.comments = commentsData;
    },
    async handleAddPostFormSubmit(e) {
      e.preventDefault();
      await addNewPost(this.newPostData.title, this.newPostData.content, this.newPostData.featuredMedia);
      this.newPostData = { title: "", content: "", featuredMedia: null };
      this.showAddPostForm = false;
      await this.fetchData();
    },
    handleFileChange(e) {
      this.newPostData.featuredMedia = e.target.files[0];
    },
    cancelAddPostForm() {
      this.showAddPostForm = false;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

  
  <style scoped>
  /* Add your styles here */
  </style>
  