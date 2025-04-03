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
    icon: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.icon === "") {
      toast.error("Icon field is required");
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

    try {
      await axios.post(`${BACKEND_URL}/api/service/add-service`, formData);
      toast.success("Service added successfully");
      setFormData({
        icon: "",
        title: "",
        description: "",
      });
    } catch (err) {
      toast.success("Error Adding Service");
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
                    {/* Icon Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="icon"
                        name="icon"
                        value={formData.icon}
                        onChange={handleChange}
                        placeholder="Enter icon"
                      />
                      <label htmlFor="icon">Icon</label>
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
