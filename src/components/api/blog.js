import axios from "axios";

// Set up Axios instance with base URL
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// Export API functions
export const fetchBlogs = async () => {
  let allBlogs = [];
  let pageNum = 1;
  let totalPages = 1;

  while (pageNum <= totalPages) {
    const res = await api.get(
      `/posts?_embed&per_page=100&page=${pageNum}`
    );
    allBlogs = [...allBlogs, ...res.data];
    totalPages = res.headers["x-wp-totalpages"];
    pageNum++;
  }

  return allBlogs;
};

export const fetchSingleBlogPost = async (id) => {
  return await api.get(`/posts/${id}`);
};

export const fetchMedia = async (id) => {
  return await api.get(`/media/${id}`);
};

export const fetchComments = async (postId) => {
  const response = await api.get(`/comments?post=${postId}`);
  return response.data;
};
