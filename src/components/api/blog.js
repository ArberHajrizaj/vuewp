import axios from "axios";




// Set up Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VUE_APP_API_URL,
});

// Obtain JWT token
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215YmxvZyIsImlhdCI6MTY4MTc0Mzk0MiwibmJmIjoxNjgxNzQzOTQyLCJleHAiOjE2ODIzNDg3NDIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.VWDanhPbWr8vdsWZXaYisW3mFBm759m2DB0AtKPibhs"; // Replace with your actual JWT token

// Set up Axios instance with token in headers
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

export const addNewPost = async (title, content, featuredMediaId) => {
  const data = {
    title: title,
    content: content,
    featured_media: featuredMediaId,
    status: "publish", // Set status to "publish"
  };

  try {
    const response = await api.post(`/posts`, data);
    console.log('Post added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    // Handle error, e.g. show error message
    throw error;
  }
};
