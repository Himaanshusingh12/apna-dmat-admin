import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function AddServiceDetails() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [subservice, Setsubservice] = useState([]);

  useEffect(() => {
    fetchsubService();
  }, []);

  const fetchsubService = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/subservice/get-activesubservice`
      );
      if (response.status === 200) {
        Setsubservice(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error fetching sub service:",
        error.response?.data || error.message
      );
      toast.error(
        `Error fetching sub service: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // section for add service details
  const [formData, setFormData] = useState({
    subservice_id: "",
    image: null,
    sort_description: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.subservice_id === "") {
      toast.error("Please select a sub service");
      return;
    }

    if (!formData.image === "") {
      toast.error("image field is required");
      return;
    }

    if (formData.sort_description === "") {
      toast.error("Sort description field is required");
      return;
    }

    if (formData.description === "") {
      toast.error("Description field is required");
      return;
    }

    const formDataToSend = new FormData();

    // Append files if selected
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Append text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/service-detail/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Service Details Added Successfully !");
        setFormData({
          subservice_id: "",
          image: null,
          sort_description: "",
          description: "",
        });
      }
    } catch (error) {
      toast.error("Failed to add service details. Please try again.");
      console.error("Error submitting form:", error);
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
                  <h6 className="mb-4">Add Sub Service Details</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <select
                        className="form-control"
                        id="subservice_id"
                        name="subservice_id"
                        value={formData.subservice_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Sub Service</option>
                        {subservice.length > 0 ? (
                          subservice.map((item) => (
                            <option
                              key={item.subservice_id}
                              value={item.subservice_id}
                            >
                              {item.title}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            No Active Sub Services Available
                          </option>
                        )}
                      </select>
                      <label htmlFor="subservice_id">Select Sub Service</label>
                    </div>
                    {/* image field*/}
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        placeholder="Upload image"
                      />
                      <label htmlFor="image">Upload image</label>
                    </div>

                    {/* Sort description Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="sort_description"
                        name="sort_description"
                        value={formData.sort_description}
                        onChange={handleChange}
                        placeholder="Enter Sort Description"
                      />
                      <label htmlFor="sort_description">Sort Description</label>
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
                      Add Details
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

export default AddServiceDetails;
