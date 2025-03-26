import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { BACKEND_URL } from "../Constant";

function ManageTestimonial() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [testimonial, SetTestimonial] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchTestimonial();
  }, [currentPage]);

  const fetchTestimonial = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/testimonial/get-testimonial`,
        {
          params: { page: currentPage, limit: limit },
        }
      );
      if (response.status === 200) {
        SetTestimonial(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        console.log("The Fetched Testimonial are:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching testimonial:",
        error.response?.data || error.message
      );
      toast.error(
        `Error fetching testimonial: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const searchTestimonial = async (query) => {
    if (!query.trim()) {
      fetchTestimonial();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/testimonial/search-testimonial`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        SetTestimonial(response.data.data);
      }
    } catch (error) {
      console.error("Error searching testimonial:", error);
      toast.error("Error searching testimonial");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchTestimonial();
    } else {
      searchTestimonial(query);
    }
  };

  // Delete Testimonial
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/testimonial/delete-testimonial/${id}`
      );
      if (response.status === 200) {
        toast.success("Testimonial deleted successfully!");
        fetchTestimonial();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/testimonial/status/${id}`);
      toast.success("Testimonial status updated successfully!");
      fetchTestimonial();
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

  return (
    <>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        {isSidebarOpen && <SidePanel />}
        <div className={`content ${isSidebarOpen ? "content-open" : ""}`}>
          <Header onToggleSidebar={toggleSidebar} />
          <div className="col-12 mt-2">
            <div className="bg-white shadow rounded h-100 p-4 border">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-primary">Manage Testimonial</h6>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search name..."
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
                      <th scope="col">Name</th>
                      <th scope="col" className="text-center">
                        Review
                      </th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonial.length > 0 ? (
                      testimonial.map((testimonial, index) => (
                        <tr
                          key={testimonial.testimonial_id}
                          className="table-light"
                        >
                          <th>{index + 1}</th>
                          <td className="border text-muted">
                            {testimonial.name}
                          </td>
                          <td className="border text-muted">
                            {testimonial.review}
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                testimonial.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {testimonial.status}
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
                                  testimonial.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  toggleStatus(testimonial.testimonial_id)
                                }
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  handleDelete(testimonial.testimonial_id)
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
                          No users found!
                        </td>
                      </tr>
                    )}
                  </tbody>
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

export default ManageTestimonial;
