import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function ManageUnlistedShares() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [unlistedshares, Setunlistedshares] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedunlistedshare, setSelectedunlistedshare] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const limit = 10;

  useEffect(() => {
    fetchUnlistedshares();
  }, [currentPage]);

  const fetchUnlistedshares = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/unlisted-shares/get`,
        {
          params: { page: currentPage, limit: limit },
        }
      );
      if (response.status === 200) {
        Setunlistedshares(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        // console.log("The Fetched unlisted shares:", response.data);
      }
    } catch (error) {
      toast.error(
        `Error fetching unlisted shares: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // search Blog categories
  const searchUnlistedshares = async (query) => {
    if (!query.trim()) {
      fetchUnlistedshares();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/unlisted-shares/search`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        Setunlistedshares(response.data.data);
      }
    } catch (error) {
      // console.error("Error searching blog category:", error);
      toast.error("Error searching unlisted shares");
    }
  };

  //   // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchUnlistedshares();
    } else {
      searchUnlistedshares(query);
    }
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/unlisted-shares/status/${id}`);
      toast.success("Unlisted shares status updated successfully!");
      fetchUnlistedshares();
    } catch (error) {
      toast.error(
        `Error updating status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/unlisted-shares/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Unlisted shares deleted successfully");
        fetchUnlistedshares();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle Update unlisted shares
  // Update Handler
  const handleUpdateunlistedshare = async () => {
    if (!selectedunlistedshare) return;

    try {
      const formData = new FormData();
      formData.append("company_name", selectedunlistedshare.company_name);
      formData.append("share_price", selectedunlistedshare.share_price);
      formData.append("industry", selectedunlistedshare.industry);
      formData.append(
        "estimated_valuation",
        selectedunlistedshare.estimated_valuation
      );
      formData.append(
        "investment_opportunity",
        selectedunlistedshare.investment_opportunity
      );
      formData.append(
        "projected_ipo_date",
        selectedunlistedshare.projected_ipo_date
      );

      if (imageFile) {
        formData.append("company_logo", imageFile);
      }

      await axios.put(
        `${BACKEND_URL}/api/unlisted-shares/edit/${selectedunlistedshare.unlistedshares_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Unlisted share updated successfully!");
      fetchUnlistedshares();
      setSelectedunlistedshare(null);
      setImageFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Error updating unlisted shares");
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
                <h6 className="fw-bold text-primary">Manage Unlisted Shares</h6>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search Category..."
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
                      <th scope="col">Company Logo</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Share Price</th>
                      <th scope="col">Industry</th>
                      <th scope="col">Estimated Valuation</th>
                      <th scope="col">Investment Opportunity</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unlistedshares.length > 0 ? (
                      unlistedshares.map((unlistedshares, index) => (
                        <tr
                          key={unlistedshares.unlistedshares_id}
                          className="table-light"
                        >
                          <th>{index + 1}</th>
                          <td>
                            <img
                              src={unlistedshares.company_logo}
                              alt=""
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </td>
                          <td className="border text-muted">
                            {unlistedshares.company_name}
                          </td>
                          <td className="border text-muted">
                            {unlistedshares.share_price}
                          </td>
                          <td className="border text-muted">
                            {unlistedshares.industry}
                          </td>
                          <td className="border text-muted">
                            {unlistedshares.estimated_valuation}
                          </td>
                          <td className="border text-muted">
                            {unlistedshares.investment_opportunity}
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                unlistedshares.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {unlistedshares.status}
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
                                  unlistedshares.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  toggleStatus(unlistedshares.unlistedshares_id)
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
                                  setSelectedunlistedshare(unlistedshares)
                                }
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  handleDelete(unlistedshares.unlistedshares_id)
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
                          No Unlisted Shares found!
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {/*Edit Unlisted share Modal */}
                  <div
                    className="modal fade"
                    id="editServiceModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">Edit Unlisted Share</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>

                        <div className="modal-body bg-primary text-white">
                          <div className="mb-3">
                            <label className="form-label">
                              Upload New Company Logo
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleImageChange}
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Company Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedunlistedshare?.company_name || ""}
                              onChange={(e) =>
                                setSelectedunlistedshare({
                                  ...selectedunlistedshare,
                                  company_name: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Share Price</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedunlistedshare?.share_price || ""}
                              onChange={(e) =>
                                setSelectedunlistedshare({
                                  ...selectedunlistedshare,
                                  share_price: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Industry</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedunlistedshare?.industry || ""}
                              onChange={(e) =>
                                setSelectedunlistedshare({
                                  ...selectedunlistedshare,
                                  industry: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">
                              Estimated Valuation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={
                                selectedunlistedshare?.estimated_valuation || ""
                              }
                              onChange={(e) =>
                                setSelectedunlistedshare({
                                  ...selectedunlistedshare,
                                  estimated_valuation: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">
                              Investment Opportunity
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={
                                selectedunlistedshare?.investment_opportunity ||
                                ""
                              }
                              onChange={(e) =>
                                setSelectedunlistedshare({
                                  ...selectedunlistedshare,
                                  investment_opportunity: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">
                              Projected IPO Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={
                                selectedunlistedshare?.projected_ipo_date || ""
                              }
                              onChange={(e) =>
                                setSelectedunlistedshare({
                                  ...selectedunlistedshare,
                                  projected_ipo_date: e.target.value,
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
                            className="btn btn-light text-primary fw-bold"
                            onClick={handleUpdateunlistedshare}
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

export default ManageUnlistedShares;
