import { Form } from "react-router-dom";
import { create } from "zustand";
import axios from "axios";

// const API = "http://localhost:5000";

const API = https://mock-api-ukyk.onrender.com";

export const ZustandStore = create((set, get) => ({
  form: {
    email: "",
    password: "",
  },
  blogs: [],
  user: JSON.parse(localStorage.getItem("user")) || null,

  InputField: (key, value) =>
    set((state) => ({
      form: { ...state.form, [key]: value },
    })),
  
  ClearForm: () =>
    set((state) => ({
      form: {
        email: "",
        password: "",
      },
    })),

  // BLOGS
  fetchBlogs: async () => {
    try {
      const res = await axios.get(`${API}/blogs`);
      set({ blogs: res.data });
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  },

  addBlog: async (blog) => {
    try {
      await axios.post(`${API}/blogs`, blog);
      const res = await axios.get(`${API}/blogs`);
      set({ blogs: res.data });
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  },

  updateBlog: async (blog) => {
    try {
      await axios.put(`${API}/blogs/${blog.id}`, blog);
      const res = await axios.get(`${API}/blogs`);
      set({ blogs: res.data });
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  },

  deleteBlog: async (id) => {
    try {
      await axios.delete(`${API}/blogs/${id}`);
      const res = await axios.get(`${API}/blogs`);
      set({ blogs: res.data });
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  },

  // AUTH
  registerUser: async (user) => {
    const res = await axios.post(`${API}/users`, user);
    return res.data;
  },

  loginUser: async (email, password) => {
    const res = await axios.get(`${API}/users?email=${email}&password=${password}`);
    if (res.data.length > 0) {
      const user = res.data[0];
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
      return user;
    }
    return null;
  },

  logoutUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
  //   blogs: JSON.parse(localStorage.getItem("blogs")) || [],

  // addBlog: (blog) => {
  //   const updatedBlogs = [...get().blogs, blog];
  //   localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  //   set({ blogs: updatedBlogs });
  // },

  // deleteBlog: (id) => {
  //   const updatedBlogs = get().blogs.filter(
  //     (blog) => blog.id !== id
  //   );
  //   localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  //   set({ blogs: updatedBlogs });
  // },
  //  updateBlog: (updatedBlog) => {
  //   const updatedBlogs = get().blogs.map((blog) =>
  //     blog.id === updatedBlog.id
  //       ? { ...blog, ...updatedBlog }
  //       : blog
  //   );

  //   localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  //   set({ blogs: updatedBlogs });
  // },


  // clearBlogs: () => {
  //   localStorage.removeItem("blogs");
  //   set({ blogs: [] });
  // },
}));
