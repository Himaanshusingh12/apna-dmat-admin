import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function ManagePrivacyPolicy() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [privacypolicy, SetPrivacypolicy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPrivacy, setSelectedPrivacy] = useState(null);
  const limit = 5;

  useEffect(() => {
    fetchPrivacypolicy();
  }, [currentPage]);

  const fetchPrivacypolicy = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/privacy-policy/get`,
        {
          params: { page: currentPage, limit: limit },
        }
      );
      if (response.status === 200) {
        SetPrivacypolicy(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        console.log("The Fetched Privacy & policy are:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching privacy & policy:",
        error.response?.data || error.message
      );
      toast.error(
        `Error fetching privacy & policy: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // search terms & condition
  const searchPrivacypolicy = async (query) => {
    if (!query.trim()) {
      fetchPrivacypolicy();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/privacy-policy/search`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        SetPrivacypolicy(response.data.data);
      }
    } catch (error) {
      console.error("Error searching privacy & policy:", error);
      toast.error("Error searching privacy & policy");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchPrivacypolicy();
    } else {
      searchPrivacypolicy(query);
    }
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/privacy-policy/status/${id}`);
      toast.success("Privacy & policy status updated successfully!");
      fetchPrivacypolicy();
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

  // Delete privacy policy
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/privacy-policy/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Privacy & policy deleted successfully!");
        fetchPrivacypolicy();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handle Terms condition Update
  const Updateprivacypolicy = async () => {
    if (!selectedPrivacy) return;

    try {
      await axios.put(
        `${BACKEND_URL}/api/privacy-policy/edit/${selectedPrivacy.privacypolicy_id}`,
        {
          content: selectedPrivacy.content,
        }
      );
      toast.success("Privacy & policy updated successfully!");
      fetchPrivacypolicy();
      setSelectedPrivacy(null);
    } catch (error) {
      toast.error("Error updating privacy & policy");
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
                <h6 className="fw-bold text-primary">
                  Manage Privacy & Policy
                </h6>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search Content..."
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
                      <th scope="col">Content</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privacypolicy.length > 0 ? (
                      privacypolicy.map((privacypolicy, index) => (
                        <tr
                          key={privacypolicy.privacypolicy_id}
                          className="table-light"
                        >
                          <th>{index + 1}</th>
                          <td className="border text-muted">
                            {privacypolicy.content}
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                privacypolicy.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {privacypolicy.status}
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
                                  privacypolicy.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  toggleStatus(privacypolicy.privacypolicy_id)
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
                                  setSelectedPrivacy(privacypolicy)
                                }
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  handleDelete(privacypolicy.privacypolicy_id)
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
                          No privacy & policy found!
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {/*Edit Privacy & policy Modal */}
                  <div
                    className="modal fade"
                    id="editServiceModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">Edit Privacy & Policy</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-primary text-white">
                          <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea
                              className="form-control"
                              value={selectedPrivacy?.content || ""}
                              onChange={(e) =>
                                setSelectedPrivacy({
                                  ...selectedPrivacy,
                                  content: e.target.value,
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
                            onClick={Updateprivacypolicy}
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

export default ManagePrivacyPolicy;
