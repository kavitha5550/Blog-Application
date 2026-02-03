import React, { useState, useEffect } from "react";
// import { blogs } from "../assets/assets";
import { CalendarFold, Pen, ArrowLeft } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { ZustandStore } from "../Store/ZustandStore";



const AllBlog = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const navigator = useNavigate();
  const { fetchBlogs, blogs } = ZustandStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs
    .filter((item) => (item.author || "").toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
      if (sort === "oldest") {
        return new Date(a.createdDate) - new Date(b.createdDate);
      }
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "za") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-64
               focus:outline-none focus:ring-2 focus:ring-amber-600"
          />

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-48
               focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">Title A–Z</option>
            <option value="za">Title Z–A</option>
          </select>

          {/* Spacer */}
          <div className="flex-1 hidden sm:block"></div>

          {/* Back Button */}
          <button
            onClick={() => navigator(-1)}
            className="flex items-center gap-1 text-gray-600 hover:text-black transition self-start sm:self-auto"
          >
            <ArrowLeft size={18} />

          </button>
        </div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  {item.shortDescription}
                </p>

                {/* Meta */}
                <div className="flex justify-between text-xs text-gray-500 mt-4">
                  <div className="flex items-center gap-1">
                    <CalendarFold size={12} />
                    <span>{item.createdDate}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Pen size={12} />
                    <span>{item.author}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() =>
                    setSelectedId(selectedId === item.id ? null : item.id)
                  }
                  className="mt-4 text-sm font-medium text-white btn"
                >
                  {selectedId === item.id ? "Read Less ↑" : "Read More →"}
                </button>
              </div>

              {/* Read More Overlay */}
              {selectedId === item.id && (
                <div
                  className="absolute left-0 top-full mt-2 w-full bg-white 
                                text-sm text-gray-700 p-4 rounded-xl shadow-lg
                                max-h-64 overflow-y-auto z-50 whitespace-pre-line"
                >
                  {item.readMore}
                </div>
              )}
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default AllBlog;
