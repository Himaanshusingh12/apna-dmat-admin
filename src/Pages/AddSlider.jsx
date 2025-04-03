import React, { useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function AddSlider() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // section for add service details
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleFileChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !image2) {
      toast.error("Both image fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("image2", image2);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/slider/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Images Uploaded Successfully!");
        setImage(null);
        setImage2(null);
      }
    } catch (error) {
      toast.error("Failed to upload images. Please try again.");
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
                  <h6 className="mb-4">Add Slider</h6>
                  <form onSubmit={handleSubmit}>
                    {/* slider field*/}
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        placeholder="Upload image"
                        onChange={(e) => handleFileChange(e, setImage)}
                      />
                      <label htmlFor="image">Upload first image</label>
                    </div>

                    {/* Second image field */}
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="image2"
                        name="image2"
                        placeholder="Upload second image"
                        onChange={(e) => handleFileChange(e, setImage2)}
                      />
                      <label htmlFor="image2">Upload second image</label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      upload image
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

export default AddSlider;
