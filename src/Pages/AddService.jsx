import React, { useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function AddService() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
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

    if (!formData.image) {
      toast.error("Image is required");
      return;
    }

    if (formData.title === "") {
      toast.error("Title field is required");
      return;
    }

    if (formData.description === "") {
      toast.error("Description field is required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("meta_title", formData.meta_title);
    formDataToSend.append("meta_description", formData.meta_description);
    formDataToSend.append("meta_keywords", formData.meta_keywords);

    try {
      await axios.post(
        `${BACKEND_URL}/api/service/add-service`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Service added successfully");
      setFormData({
        image: null,
        title: "",
        description: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
      });
    } catch (err) {
      toast.error("Error Adding Service");
      // console.error(err);
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
                  <h6 className="mb-4">Add Service</h6>
                  <form onSubmit={handleSubmit}>
                    {/* Image Field */}
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
                    {/* Title Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                      />
                      <label htmlFor="title">Title</label>
                    </div>

                    {/* Description Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                      />
                      <label htmlFor="description">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="meta_title"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        placeholder="Enter Meta Title"
                      />
                      <label htmlFor="meta_title">Meta Title</label>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        type="text"
                        className="form-control"
                        id="meta_description"
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        placeholder="Enter Meta Description"
                      ></textarea>
                      <label htmlFor="meta_description">Meta Description</label>
                    </div>
                    <div className="form-floating mb-3">
                      <textarea
                        type="text"
                        className="form-control"
                        id="meta_keywords"
                        name="meta_keywords"
                        value={formData.meta_keywords}
                        onChange={handleChange}
                        placeholder="Enter Meta keywords"
                      ></textarea>
                      <label htmlFor="meta_keywords">Meta Keywords</label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add Service
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

export default AddService;
