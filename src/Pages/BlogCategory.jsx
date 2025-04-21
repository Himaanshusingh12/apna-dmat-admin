import React, { useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function BlogCategory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [formData, setFormData] = useState({
    category: "",
    image: null,
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.category === "") {
      toast.error("Category field is required");
      return;
    }

    if (!formData.image) {
      toast.error("Image is required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("image", formData.image);

    if (formData.meta_title) {
      formDataToSend.append("meta_title", formData.meta_title);
    }

    if (formData.meta_description) {
      formDataToSend.append("meta_description", formData.meta_description);
    }

    if (formData.meta_keywords) {
      formDataToSend.append("meta_keywords", formData.meta_keywords);
    }

    try {
      await axios.post(`${BACKEND_URL}/api/blog-category/add`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog Category added successfully");
      setFormData({
        category: "",
        image: null,
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
      });
    } catch (err) {
      toast.error("Error Adding Blog Category");
    }
  };

  return (
    <>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        {/* <SidePanel /> */}
        {isSidebarOpen && <SidePanel />}
        {/* <div className="content"> */}
        <div className={`content ${isSidebarOpen ? "content-open" : ""}`}>
          {/* <Header /> */}
          <Header onToggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-6">
                <div className="bg-light rounded h-100 p-4">
                  <h6 className="mb-4">Add Blog Category</h6>
                  <form onSubmit={handleSubmit}>
                    {/* Category Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter Category"
                      />
                      <label htmlFor="category">Enter Category</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        placeholder="Upload Image"
                      />
                      <label htmlFor="image">Upload Image</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="meta_title"
                        name="meta_title"
                        onChange={handleChange}
                        placeholder="Enter meta title"
                      />
                      <label htmlFor="meta_title">Meta Title</label>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        type="text"
                        className="form-control"
                        id="meta_description"
                        name="meta_description"
                        onChange={handleChange}
                        placeholder="Enter meta description"
                      ></textarea>
                      <label htmlFor="meta_description">Meta Description</label>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        type="text"
                        className="form-control"
                        id="meta_keywords"
                        name="meta_keywords"
                        onChange={handleChange}
                        placeholder="Enter meta keywords"
                      ></textarea>
                      <label htmlFor="meta_keywords">Meta Keywords</label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Add Category
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default BlogCategory;
