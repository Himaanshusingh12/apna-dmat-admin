import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function PopupDetails() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [details, SetDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchDetails();
  }, [currentPage]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/popup-detail/get`, {
        params: { page: currentPage, limit: limit },
      });
      if (response.status === 200) {
        SetDetails(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        // console.log("The Fetched details are:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching details:",
        error.response?.data || error.message
      );
      toast.error(
        `Error fetching details: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/popup-detail/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Detail deleted successfully!");
        fetchDetails();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const searchDetails = async (query) => {
    if (!query.trim()) {
      fetchDetails();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/popup-detail/search`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        SetDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error searching details:", error);
      toast.error("Error searching details");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchDetails();
    } else {
      searchDetails(query);
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
                <h6 className="fw-bold text-primary">Registered Users</h6>
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search..."
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
                      <th scope="col">Mobile Number</th>
                      <th scope="col">Services</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.length > 0 ? (
                      details.map((details, index) => (
                        <tr
                          key={details.popupdetails_id}
                          className="table-light"
                        >
                          <th>{index + 1}</th>
                          <td className="border text-muted">{details.name}</td>
                          <td className="border text-muted">
                            {details.mobile_number}
                          </td>
                          <td className="border text-muted">
                            {/* {details.services} */}
                            <td>{JSON.parse(details.services).join(", ")}</td>
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                details.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {details.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm bg-danger"
                              onClick={() =>
                                handleDelete(details.popupdetails_id)
                              }
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center text-danger fw-bold border"
                        >
                          No details found!
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

export default PopupDetails;
