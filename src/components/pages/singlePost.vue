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
      <div v-if="comments.length === 0">
        <p>No comments for this post.</p>
      </div>
      <div v-else>
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <h3>{{ comment.author_name }}</h3>
          <div v-html="comment.content.rendered"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { fetchSingleBlogPost, fetchMedia, fetchComments } from "../api/blog";
import "../../assets/single-post.css";

export default {
  setup() {
    const blog = ref(null);
    const featuredMedia = ref(null);
    const comments = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const { data } = await fetchSingleBlogPost(route.params.id);
      blog.value = data;
      if (data && data.featured_media) {
        const mediaData = await fetchMedia(data.featured_media);
        featuredMedia.value = mediaData.data;
      }
      const commentsData = await fetchComments(route.params.id);
      comments.value = commentsData;
    });

    return {
      blog,
      featuredMedia,
      comments,
    };
  },
};
</script>

