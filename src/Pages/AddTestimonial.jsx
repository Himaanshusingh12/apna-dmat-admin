import React, { useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Constant";

function AddTestimonial() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name === "") {
      toast.error("Name field is required");
      return;
    }

    if (formData.review === "") {
      toast.error("Review field is required");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/testimonial/add-testimonial`,
        formData
      );
      toast.success("Testimonial added successfully");
      setFormData({
        name: "",
        review: "",
      });
    } catch (err) {
      toast.success("Error Adding Testimonial");
      console.error(err);
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
                  <h6 className="mb-4">Add Testimonial</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                      />
                      <label htmlFor="floatingInput">Client Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        placeholder="Enter review"
                      />
                      <label htmlFor="floatingPassword">Review</label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add Testimonial
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

export default AddTestimonial;
