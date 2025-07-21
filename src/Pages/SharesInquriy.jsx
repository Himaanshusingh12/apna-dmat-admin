import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";
import Footer from "../Component/Footer";

function SharesInquriy() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [inquaries, Setinquaries] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchenquaries();
  }, [currentPage]);

  const fetchenquaries = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/unlistedshares-inquiry/get`,
        {
          params: { page: currentPage, limit: limit },
        }
      );
      if (response.status === 200) {
        Setinquaries(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      toast.error(
        `Error fetching inquiry detail: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // const searchUsers = async (query) => {
  //   if (!query.trim()) {
  //     fetchUsers();
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `${BACKEND_URL}/api/users/search-users`,
  //       {
  //         params: { query: query },
  //       }
  //     );

  //     if (response.status === 200) {
  //       SetUser(response.data.data);
  //     }
  //   } catch (error) {
  //     toast.error("Error searching users");
  //   }
  // };

  // Handle Search Input Change
  // const handleSearch = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   if (query.trim() === "") {
  //     fetchUsers();
  //   } else {
  //     searchUsers(query);
  //   }
  // };

  // Delete User
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `${BACKEND_URL}/api/users/delete-user/${id}`
  //     );
  //     if (response.status === 200) {
  //       toast.success("User deleted successfully!");
  //       fetchUsers();
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
                  Unlisted Shares Inquiry
                </h6>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered align-middle text-left  table-striped">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col" className="text-center">
                        S. No.
                      </th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Name</th>
                      <th scope="col">Mobile Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquaries.length > 0 ? (
                      inquaries.map((inquaries, index) => (
                        <tr key={inquaries.inquiry_id} className="table-light">
                          <th>{index + 1}</th>
                          <td className="border text-muted">
                            {inquaries.company_name}
                          </td>
                          <td className="border text-muted">
                            {inquaries.name}
                          </td>
                          <td className="border text-muted">
                            {inquaries.mobile_number}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No inquiry found!
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

export default SharesInquriy;
