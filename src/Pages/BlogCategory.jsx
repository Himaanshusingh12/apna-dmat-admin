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
  });

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

    try {
      await axios.post(`${BACKEND_URL}/api/blog-category/add`, formData);
      toast.success("Blog Category added successfully");
      setFormData({
        category: "",
      });
    } catch (err) {
      toast.error("Error Adding Blog Category");
      // console.error(err);
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
