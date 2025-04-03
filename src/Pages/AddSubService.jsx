import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function AddSubService() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // section for fetch services for the select service field
  const [service, Setservice] = useState([]);

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/service/get-active-service`
      );
      if (response.status === 200) {
        Setservice(response.data.data);
      }
    } catch (error) {
      toast.error(
        `Error fetching service: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // section for add new subservice
  const [formData, setFormData] = useState({
    service_id: "",
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

    if (formData.service_id === "") {
      toast.error("Please select a service");
      return;
    }

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
      await axios.post(
        `${BACKEND_URL}/api/subservice/add-subservice`,
        formData
      );
      toast.success("Service added successfully");
      setFormData({
        service_id: "",
        icon: "",
        title: "",
        description: "",
      });
    } catch (err) {
      toast.success("Error Adding Service");
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
                  <h6 className="mb-4">Add Sub Service</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <select
                        className="form-control"
                        id="service_id"
                        name="service_id"
                        value={formData.service_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Service</option>
                        {service.length > 0 ? (
                          service.map((item) => (
                            <option
                              key={item.service_id}
                              value={item.service_id}
                            >
                              {item.title}
                            </option>
                          ))
                        ) : (
                          <option disabled>No Active Services Available</option>
                        )}
                      </select>
                      <label htmlFor="service_id">Select Service</label>
                    </div>
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

export default AddSubService;
