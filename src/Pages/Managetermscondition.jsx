import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../Constant";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

function Managetermscondition() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [termcondition, SetTermcondition] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTerms, setSelectedTerms] = useState(null);
  const limit = 10;

  useEffect(() => {
    fetchTermscondition();
  }, [currentPage]);

  const fetchTermscondition = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/terms-condition/get`,
        {
          params: { page: currentPage, limit: limit },
        }
      );
      if (response.status === 200) {
        SetTermcondition(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      toast.error(
        `Error fetching terms & condition: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // search terms & condition
  const searchTermcondition = async (query) => {
    if (!query.trim()) {
      fetchTermscondition();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/terms-condition/search`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        SetTermcondition(response.data.data);
      }
    } catch (error) {
      toast.error("Error searching terms & condition");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchTermscondition();
    } else {
      searchTermcondition(query);
    }
  };

  // Delete terms condition
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/terms-condition/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Terms & condition deleted successfully!");
        fetchTermscondition();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/terms-condition/status/${id}`);
      toast.success("Terms & condition status updated successfully!");
      fetchTermscondition();
    } catch (error) {
      toast.error(
        `Error updating status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Handle Terms condition Update
  const Updatetetermscondition = async () => {
    if (!selectedTerms) return;

    try {
      await axios.put(
        `${BACKEND_URL}/api/terms-condition/edit/${selectedTerms.termscondition_id}`,
        {
          content: selectedTerms.content,
        }
      );
      toast.success("Terms & condition updated successfully!");
      fetchTermscondition();
      setSelectedTerms(null);
    } catch (error) {
      toast.error("Error updating terms & condition");
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
                  Manage Terms & Condition
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
                    {termcondition.length > 0 ? (
                      termcondition.map((termcondition, index) => (
                        <tr
                          key={termcondition.termcondition_id}
                          className="table-light"
                        >
                          <th>{index + 1}</th>
                          {/* <td className="border text-muted">
                            {termcondition.content}
                          </td> */}
                          <td
                            className="border text-muted"
                            title={stripHtml(termcondition.content)}
                          >
                            {stripHtml(termcondition.content).length > 100
                              ? stripHtml(termcondition.content).slice(0, 100) +
                                "..."
                              : stripHtml(termcondition.content)}
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                termcondition.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {termcondition.status}
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
                                  termcondition.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  toggleStatus(termcondition.termscondition_id)
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
                                onClick={() => setSelectedTerms(termcondition)}
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  handleDelete(termcondition.termscondition_id)
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
                          No terms & condition found!
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {/*Edit Terms & condition Modal */}
                  <div
                    className="modal fade"
                    id="editServiceModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-fullscreen">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">
                            Edit Terms & condition
                          </h5>
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
                            {/* <textarea
                              className="form-control"
                              value={selectedTerms?.content || ""}
                              onChange={(e) =>
                                setSelectedTerms({
                                  ...selectedTerms,
                                  content: e.target.value,
                                })
                              }
                            ></textarea> */}
                            <JoditEditor
                              value={selectedTerms?.content || ""}
                              onChange={(newContent) =>
                                setSelectedTerms({
                                  ...selectedTerms,
                                  content: newContent,
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
                            onClick={Updatetetermscondition}
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

export default Managetermscondition;
