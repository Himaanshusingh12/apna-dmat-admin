import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Constant";

function ManageServiceDetails() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [servicedetail, Setservicedetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selecteddetail, setSelectedDetail] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const limit = 1;

  useEffect(() => {
    fetchserviceDetail();
  }, [currentPage]);

  const fetchserviceDetail = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/service-detail/get`,
        {
          params: { page: currentPage, limit: limit },
        }
      );
      if (response.status === 200) {
        Setservicedetail(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        console.log("The Fetched Service are:", response.data);
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

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // search sub service
  const searchserviceDetail = async (query) => {
    if (!query.trim()) {
      fetchserviceDetail();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/service-detail/search`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        Setservicedetail(response.data.data);
      }
    } catch (error) {
      console.error("Error searching service:", error);
      toast.error("Error searching service");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchserviceDetail();
    } else {
      searchserviceDetail(query);
    }
  };
  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/service-detail/status/${id}`);
      toast.success("Service detail status updated successfully!");
      fetchserviceDetail();
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
      toast.error(
        `Error updating status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Delete Service Detail
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/service-detail/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Service detail deleted successfully!");
        fetchserviceDetail();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle Service Update with Image Upload
  const handleUpdatesubService = async () => {
    if (!selecteddetail) return;
    // console.log("Selected Detail:", selecteddetail);
    try {
      const formData = new FormData();
      formData.append("sort_description", selecteddetail.sort_description);
      formData.append("description", selecteddetail.description);
      if (imageFile) {
        // console.log("Image File:", imageFile);
        formData.append("image", imageFile);
      }
      await axios.put(
        `${BACKEND_URL}/api/service-detail/edit/${selecteddetail.servicedetails_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Service detail updated successfully!");
      fetchserviceDetail();
      setSelectedDetail(null);
      setImageFile(null);
    } catch (error) {
      // console.error("Update Error:", error);
      toast.error("Error updating service detail");
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
                <h5 className="fw-bold text-primary">Manage Service Detail</h5>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search Subservice..."
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
                      <th>Sub Service</th>
                      <th scope="col">image</th>
                      <th scope="col">Sort Description</th>
                      {/* <th scope="col" className="w-100">
                        Description
                      </th> */}
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicedetail.length > 0 ? (
                      servicedetail.map((servicedetail, index) => (
                        <tr
                          key={servicedetail.servicedetail_id}
                          className="table-light"
                        >
                          <th className="text-center">{index + 1}</th>
                          <td className="border text-muted">
                            {servicedetail.subservice_title}
                          </td>
                          <td className="border text-muted">
                            {servicedetail.image}
                          </td>
                          <td className="border fw-bold text-secondary">
                            {servicedetail.sort_description}
                          </td>
                          <td className="border text-muted">
                            {servicedetail.description}
                          </td>
                          <td className="border text-center">
                            <span
                              className={`badge ${
                                servicedetail.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {servicedetail.status}
                            </span>
                          </td>
                          <td className="border text-center">
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <i
                                className={`fa ${
                                  servicedetail.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "26px", cursor: "pointer" }}
                                onClick={() =>
                                  toggleStatus(servicedetail.servicedetails_id)
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
                                onClick={() => setSelectedDetail(servicedetail)}
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  handleDelete(servicedetail.servicedetails_id)
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
                            onClick={() => setSelectedDetail(null)}
                          ></button>
                        </div>
                        <div className="modal-body bg-primary text-white">
                          <div className="mb-3">
                            <label className="form-label">
                              Upload New Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleImageChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Short Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={selecteddetail?.sort_description || ""}
                              onChange={(e) =>
                                setSelectedDetail({
                                  ...selecteddetail,
                                  sort_description: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              value={selecteddetail?.description || ""}
                              onChange={(e) =>
                                setSelectedDetail({
                                  ...selecteddetail,
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
                            onClick={() => setSelectedDetail(null)}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpdatesubService}
                            data-bs-dismiss="modal"
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

export default ManageServiceDetails;
