import { Form } from "react-router-dom";
import { create } from "zustand";
import axios from "axios";

// const API = "http://localhost:5000";

const API = "https://mock-api-ukyk.onrender.com";

export const ZustandStore = create((set, get) => ({
  form: {
    email: "",
    password: "",
  },
  blogs: [],
  loading: false,
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
    set({ loading: true });
    try {
      const res = await axios.get(`${API}/blogs`);
      set({ blogs: res.data });
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      set({ loading: false });
    }
  },

  addBlog: async (blog) => {
    set({ loading: true });
    try {
      await axios.post(`${API}/blogs`, blog);
      const res = await axios.get(`${API}/blogs`);
      set({ blogs: res.data });
    } catch (error) {
      console.error("Error adding blog:", error);
    } finally {
      set({ loading: false });
    }
  },

  updateBlog: async (blog) => {
    set({ loading: true });
    try {
      await axios.put(`${API}/blogs/${blog.id}`, blog);
      const res = await axios.get(`${API}/blogs`);
      set({ blogs: res.data });
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      set({ loading: false });
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${API}/blogs/${id}`);
      const res = await axios.get(`${API}/blogs`);
      set({ blogs: res.data });
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      set({ loading: false });
    }
  },

  // AUTH
  registerUser: async (user) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API}/users`, user);
      return res.data;
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API}/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        const user = res.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
        return user;
      }
      return null;
    } finally {
      set({ loading: false });
    }
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