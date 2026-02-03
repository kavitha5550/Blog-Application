import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ZustandStore } from "../Store/ZustandStore";

const NewBlog = () => {
  const navigate = useNavigate();
  const { addBlog } = ZustandStore();
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [sections, setSections] = useState([
    { subTitle: "", content: "", image: null },
  ]);

  /* handle section change */
  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  /* image validation */
  const handleImage = (index, file) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be under 10MB");
      return;
    }
    handleSectionChange(index, "image", file);
  };

  /* add new section */
  const addSection = () => {
    setSections([
      ...sections,
      { subTitle: "", content: "", image: null },
    ]);
  };

  /* post blog */
  const postBlog = async (e) => {
    e.preventDefault();

    if (!title || !subject) {
      toast.error("Title and Subject are required");
      return;
    }

    const processedSections = [];
    for (let sec of sections) {
      if (!sec.subTitle) {
        toast.error("Each section must have a sub-title");
        return;
      }
      if (!sec.content && !sec.image) {
        toast.error("Each section must have text or image");
        return;
      }
      if (sec.content.length > 32000) {
        toast.error("Section content exceeds 32,000 characters");
        return;
      }

      let imageBase64 = null;
      if (sec.image && typeof sec.image === 'object') {
        // Convert file to base64
        imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(sec.image);
        });
      }

      processedSections.push({
        ...sec,
        image: imageBase64 || sec.image // use base64 or keep existing if any
      });
    }

    // Use the first section's image as the main blog image, or a placeholder
    const mainImage = processedSections.find(s => s.image)?.image || "https://placehold.co/600x400?text=No+Image";

    const newBlog = {
      id: String(Date.now()), // Ensure ID is string for consistency
      title,
      subject,
      shortDescription: subject, // Mapping subject to shortDescription for compatibility
      sections: processedSections,
      author: user?.username,
      createdDate: new Date().toISOString().split("T")[0],
      image: mainImage,
      readMore: processedSections.map(s => `${s.subTitle}\n${s.content}`).join("\n\n") // Construct readMore from sections
    };

    await addBlog(newBlog);
    toast.success("Blog created successfully!");

    navigate(-1);
  };

  return (
    <div className="min-h-screen flex justify-center px-6 py-8">
      <ToastContainer position="top-center" />

      <form
        onSubmit={postBlog}
        className="w-full max-w-2xl bg-white p-6 rounded-lg shadow space-y-4 overflow-x-hidden"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create Blog
            {user ? (
              <p className="text-sm text-gray-600">
                Logged in as: <span className="font-medium">{user.username}</span>
              </p>
            ) : (
              <p className="text-red-500">User not found</p>
            )}</h1>



          <ArrowLeft
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Blog Title */}
        <input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Blog Subject */}
        <input
          placeholder="Blog Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Sections */}
        {sections.map((sec, index) => (
          <div
            key={index}
            className="border p-3 rounded space-y-2"
          >
            <input
              placeholder="Section Sub-Title"
              value={sec.subTitle}
              onChange={(e) =>
                handleSectionChange(
                  index,
                  "subTitle",
                  e.target.value
                )
              }
              className="w-full border p-2 rounded"
            />

            <textarea
              placeholder="Section Content (optional)"
              value={sec.content}
              onChange={(e) =>
                handleSectionChange(
                  index,
                  "content",
                  e.target.value
                )
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImage(index, e.target.files[0])
              }
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="text-sm text-blue-600"
        >
          + Add Section
        </button>

        <button type="submit" className="btn">
          Save Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
