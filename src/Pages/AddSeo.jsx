import React, { useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function AddSeo() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // section for add seo detail
  const [formData, setFormData] = useState({
    page_name: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.page_name === "") {
      toast.error("Please select page");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/seo/add`, formData);
      toast.success("Seo detail added successfully");
      setFormData({
        page_name: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
      });
    } catch (err) {
      toast.error("Error Adding Seo Detail");
    }
  };
  return (
    <>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        {isSidebarOpen && <SidePanel />}
        <div className={`content ${isSidebarOpen ? "content-open" : ""}`}>
          <Header onToggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-6">
                <div className="bg-light rounded h-100 p-4">
                  <h6 className="mb-4">Add Seo Detail</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <select
                        className="form-control"
                        id="page_name"
                        name="page_name"
                        value={formData.page_name}
                        onChange={handleChange}
                      >
                        <option value="">Select Page</option>
                        <option value="home">Home</option>
                        <option value="about">About</option>
                        <option value="contact">Contact</option>
                        <option value="blog">Blogs</option>
                      </select>
                      <label htmlFor="page_name">Select Page</label>
                    </div>
                    {/* Meta title Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="meta_title"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        placeholder="Enter meta title"
                      />
                      <label htmlFor="icon">Meta Title</label>
                    </div>

                    {/* meta description Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="meta_description"
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        placeholder="Enter meta description"
                      />
                      <label htmlFor="title">Meta Description</label>
                    </div>

                    {/* Meta keywords Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="meta_keywords"
                        name="meta_keywords"
                        value={formData.meta_keywords}
                        onChange={handleChange}
                        placeholder="Enter meta keywords"
                      />
                      <label htmlFor="description">Meta keywords</label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Add Detail
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

export default AddSeo;
