import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function ManageSeo() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [seodetail, Setseodetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedseoDetail, setSelectedseoDetail] = useState(null);
  const limit = 10;

  useEffect(() => {
    fetchseoDetail();
  }, [currentPage]);

  const fetchseoDetail = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/seo/get`, {
        params: { page: currentPage, limit: limit },
      });
      if (response.status === 200) {
        Setseodetail(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      toast.error(
        `Error fetching seo detail: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // search sub service
  const searchseodetail = async (query) => {
    if (!query.trim()) {
      fetchseoDetail();
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/seo/search`, {
        params: { query: query },
      });

      if (response.status === 200) {
        Setseodetail(response.data.data);
      }
    } catch (error) {
      toast.error("Error searching");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchseoDetail();
    } else {
      searchseodetail(query);
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle Service Update
  const handleUpdateseoDetail = async () => {
    if (!selectedseoDetail) return;

    try {
      await axios.put(
        `${BACKEND_URL}/api/seo/edit/${selectedseoDetail.seo_id}`,
        {
          page_name: selectedseoDetail.page_name,
          meta_title: selectedseoDetail.meta_title,
          meta_description: selectedseoDetail.meta_description,
          meta_keywords: selectedseoDetail.meta_keywords,
        }
      );

      toast.success("Seo detail updated successfully!");
      fetchseoDetail();
      setSelectedseoDetail(null);
    } catch (error) {
      toast.error("Error updating Seo detail");
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
                <h5 className="fw-bold text-primary">Manage Seo Details</h5>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search details..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-left">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">Page Name</th>
                      <th scope="col">Meta Title</th>
                      <th scope="col">Meta Description</th>
                      <th scope="col">Meta Keywords</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seodetail.length > 0 ? (
                      seodetail.map((detail, index) => (
                        <tr key={detail.seo_id} className="table-light">
                          <th>{index + 1}</th>
                          <td className="border text-muted">
                            {detail.page_name}
                          </td>
                          <td className="border fw-bold text-secondary">
                            {detail.meta_title}
                          </td>
                          <td className="border text-muted">
                            {detail.meta_description}
                          </td>
                          <td className="border text-muted">
                            {detail.meta_keywords}
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                detail.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {detail.status}
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
                              {/* <i
                                className={`fa ${
                                  subservice.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "26px", cursor: "pointer" }}
                                onClick={() =>
                                  toggleStatus(subservice.subservice_id)
                                }
                              ></i> */}
                              <i
                                className="fa fa-edit text-primary"
                                style={{
                                  fontSize: "24px",
                                  cursor: "pointer",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#editServiceModal"
                                onClick={() => setSelectedseoDetail(detail)}
                              ></i>
                              {/* <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  handleDelete(subservice.subservice_id)
                                }
                              ></i> */}
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
                          No Seo Detail Found!
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
                          <h5 className="modal-title">Edit Seo Detail</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-primary text-white">
                          <div className="mb-3">
                            <label className="form-label">Page Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedseoDetail?.page_name || ""}
                              onChange={(e) =>
                                setSelectedseoDetail({
                                  ...selectedseoDetail,
                                  page_name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Meta Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedseoDetail?.meta_title || ""}
                              onChange={(e) =>
                                setSelectedseoDetail({
                                  ...selectedseoDetail,
                                  meta_title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Meta Description
                            </label>
                            <textarea
                              className="form-control"
                              value={selectedseoDetail?.meta_description || ""}
                              onChange={(e) =>
                                setSelectedseoDetail({
                                  ...selectedseoDetail,
                                  meta_description: e.target.value,
                                })
                              }
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Meta Keyword</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedseoDetail?.meta_keywords || ""}
                              onChange={(e) =>
                                setSelectedseoDetail({
                                  ...selectedseoDetail,
                                  meta_keywords: e.target.value,
                                })
                              }
                            />
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
                            onClick={handleUpdateseoDetail}
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

export default ManageSeo;
