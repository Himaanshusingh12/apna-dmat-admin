import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function ManageService() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [service, Setservice] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const limit = 10;

  useEffect(() => {
    fetchService();
  }, [currentPage]);

  const fetchService = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/service/get-service`,
        {
          params: { page: currentPage, limit: limit },
        }
      );
      if (response.status === 200) {
        Setservice(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      toast.error(
        `Error fetching service: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // search service
  const searchService = async (query) => {
    if (!query.trim()) {
      fetchService();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/service/search-service`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        Setservice(response.data.data);
      }
    } catch (error) {
      toast.error("Error searching service");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchService();
    } else {
      searchService(query);
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/service/service-status/${id}`);
      toast.success("Service status updated successfully!");
      fetchService();
    } catch (error) {
      toast.error(
        `Error updating status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Delete Service
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/service/delete-service/${id}`
      );
      if (response.status === 200) {
        toast.success("Service deleted successfully!");
        fetchService();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handle Service Update
  const handleUpdateService = async () => {
    if (!selectedService) return;

    try {
      await axios.put(
        `${BACKEND_URL}/api/service/edit/${selectedService.service_id}`,
        {
          icon: selectedService.icon,
          title: selectedService.title,
          description: selectedService.description,
        }
      );

      toast.success("Service updated successfully!");
      fetchService();
      setSelectedService(null);
    } catch (error) {
      toast.error("Error updating service");
    }
  };
  return (
    <>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        {isSidebarOpen && <SidePanel />}
        <div className={`content ${isSidebarOpen ? "content-open" : ""}`}>
          <Header onToggleSidebar={toggleSidebar} />
          <div className="col-12 mt-2">
            <div className="bg-white shadow rounded h-100 p-4 border">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-primary">Manage service</h6>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search titles..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="table-responsive">
                <table className="table table-bordered align-middle text-left  table-striped">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col" className="text-center">
                        S. No.
                      </th>
                      <th scope="col">Icon</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.length > 0 ? (
                      service.map((service, index) => (
                        <tr key={service.service_id} className="table-light">
                          <th>{index + 1}</th>
                          <td className="border text-muted">{service.icon}</td>
                          <td className="border fw-bold text-secondary">
                            {service.title}
                          </td>
                          <td className="border text-muted">
                            {service.description}
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                service.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {service.status}
                            </span>
                          </td>
                          <td>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <i
                                className={`fa ${
                                  service.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() => toggleStatus(service.service_id)}
                              ></i>

                              <i
                                className="fa fa-edit text-primary"
                                style={{
                                  fontSize: "24px",
                                  cursor: "pointer",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#editServiceModal"
                                onClick={() => setSelectedService(service)}
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() => handleDelete(service.service_id)}
                              ></i>
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center text-danger fw-bold border"
                        >
                          No service found!
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {/*Edit Service Modal */}
                  <div
                    className="modal fade"
                    id="editServiceModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">Edit Service</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-primary text-white">
                          <div className="mb-3">
                            <label className="form-label">Icon</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedService?.icon || ""}
                              onChange={(e) =>
                                setSelectedService({
                                  ...selectedService,
                                  icon: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedService?.title || ""}
                              onChange={(e) =>
                                setSelectedService({
                                  ...selectedService,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              value={selectedService?.description || ""}
                              onChange={(e) =>
                                setSelectedService({
                                  ...selectedService,
                                  description: e.target.value,
                                })
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpdateService}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </table>
              </div>
              <div className="d-flex justify-content-end align-items-center mt-3">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
                <span className="me-3">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ManageService;
