import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ZustandStore } from "../Store/ZustandStore";

const User = () => {
  const { blogs, updateBlog, deleteBlog, fetchBlogs } = ZustandStore();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlogs();
  }, []);

  // show only logged-in user's blogs
  const myBlogs = blogs.filter(
    (blog) => blog.author === user?.username
  );

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    shortDescription: "",
    readMore: "",
  });

  // start editing
  const startEdit = (blog) => {
    setEditId(blog.id);
    setFormData({
      id: blog.id,
      title: blog.title,
      shortDescription: blog.shortDescription,
      readMore: blog.readMore,
    });
  };

  // save edited blog
  const saveEdit = () => {
    if (!formData.id) {
      toast.error("Blog ID missing");
      return;
    }

    updateBlog(formData);
    setEditId(null);
    toast.success("Blog updated successfully");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <ToastContainer position="top-center" />

      <h2
        className="text-lg font-semibold bg-gradient-to-r
                   from-amber-700 to-amber-900
                   bg-clip-text text-transparent"
      >
        My Blogs

      </h2>
      {user ? (
        <p className="text-sm text-gray-600">
          Logged in as: <span className="font-medium">{user.username}</span>
        </p>
      ) : (
        <p className="text-red-500">User not found</p>
      )}

      {myBlogs.length === 0 && (
        <p className="text-gray-500">No blogs yet</p>
      )}

      {myBlogs.map((blog) => (
        <div key={blog.id} className="bg-white p-4 rounded shadow">
          {editId === blog.id ? (
            <>
              <input
                className="w-full border p-2 rounded mb-2"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                className="w-full border p-2 rounded mb-2"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shortDescription: e.target.value,
                  })
                }
              />

              <textarea
                className="w-full border p-2 rounded mb-2"
                value={formData.readMore}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    readMore: e.target.value,
                  })
                }
              />

              <div className="flex gap-3">
                <button
                  onClick={saveEdit}
                  className="text-green-600 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600">
                {blog.shortDescription}
              </p>

              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => startEdit(blog)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default User;
