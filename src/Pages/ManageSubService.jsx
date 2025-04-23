import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function ManageSubService() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [subservice, Setsubservice] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedsubService, setSelectedsubService] = useState(null);
  const limit = 10;

  useEffect(() => {
    fetchsubService();
  }, [currentPage]);

  const fetchsubService = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/subservice/get-subservice`,
        {
          params: { page: currentPage, limit: limit },
        }
      );
      if (response.status === 200) {
        Setsubservice(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      toast.error(
        `Error fetching sub service: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // search sub service
  const searchsubService = async (query) => {
    if (!query.trim()) {
      fetchsubService();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/subservice/search-subservice`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        Setsubservice(response.data.data);
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
      fetchsubService();
    } else {
      searchsubService(query);
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/subservice/subservice-status/${id}`);
      toast.success("Sub Service status updated successfully!");
      fetchsubService();
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
        `${BACKEND_URL}/api/subservice/delete-subservice/${id}`
      );
      if (response.status === 200) {
        toast.success("Sub Service deleted successfully!");
        fetchsubService();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handle Service Update
  const handleUpdatesubService = async () => {
    if (!selectedsubService) return;

    try {
      await axios.put(
        `${BACKEND_URL}/api/subservice/edit-subservice/${selectedsubService.subservice_id}`,
        {
          icon: selectedsubService.icon,
          title: selectedsubService.title,
          description: selectedsubService.description,
        }
      );

      toast.success("Sub service updated successfully!");
      fetchsubService();
      setSelectedsubService(null);
    } catch (error) {
      toast.error("Error updating service");
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
          <div className="col-12 mt-2">
            <div className="bg-white shadow rounded h-100 p-4 border">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-primary">Manage Subservice</h5>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search titles..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-left">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">Icon</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Meta Title</th>
                      <th scope="col">Meta Description</th>
                      <th scope="col">Meta Keywords</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subservice.length > 0 ? (
                      subservice.map((subservice, index) => (
                        <tr
                          key={subservice.subservice_id}
                          className="table-light"
                        >
                          <th>{index + 1}</th>
                          <td className="border text-muted">
                            {subservice.icon}
                          </td>
                          <td className="border fw-bold text-secondary">
                            {subservice.title}
                          </td>
                          <td className="border text-muted">
                            {subservice.description}
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                subservice.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {subservice.status}
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
                                  subservice.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "26px", cursor: "pointer" }}
                                onClick={() =>
                                  toggleStatus(subservice.subservice_id)
                                }
                              ></i>
                              <i
                                className="fa fa-edit text-primary"
                                style={{
                                  fontSize: "24px",
                                  cursor: "pointer",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#editServiceModal"
                                onClick={() =>
                                  setSelectedsubService(subservice)
                                }
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  handleDelete(subservice.subservice_id)
                                }
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
                          No Subservice Found!
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
                          <h5 className="modal-title">Edit Sub Service</h5>
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
                              value={selectedsubService?.icon || ""}
                              onChange={(e) =>
                                setSelectedsubService({
                                  ...selectedsubService,
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
                              value={selectedsubService?.title || ""}
                              onChange={(e) =>
                                setSelectedsubService({
                                  ...selectedsubService,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              value={selectedsubService?.description || ""}
                              onChange={(e) =>
                                setSelectedsubService({
                                  ...selectedsubService,
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
                            onClick={handleUpdatesubService}
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
                  className="btn btn-outline-primary btn-sm me-2 shadow-sm border"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
                <span className="fw-bold text-secondary me-3 border p-2 rounded">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-outline-primary btn-sm shadow-sm border"
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

export default ManageSubService;
