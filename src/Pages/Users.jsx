import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function Users() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [users, SetUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/get-users`, {
        params: { page: currentPage, limit: limit },
      });
      if (response.status === 200) {
        SetUser(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        console.log("The Fetched Users are:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
      toast.error(
        `Error fetching users: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const searchUsers = async (query) => {
    if (!query.trim()) {
      fetchUsers();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/users/search-users`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        SetUser(response.data.data);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Error searching users");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchUsers();
    } else {
      searchUsers(query);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/users/delete-user/${id}`
      );
      if (response.status === 200) {
        toast.success("User deleted successfully!");
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

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
                <h6 className="fw-bold text-primary">Registered Users</h6>
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search users..."
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
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Message</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.customer_id} className="table-light">
                          <th>{index + 1}</th>
                          <td className="border text-muted">{user.name}</td>
                          <td className="border text-muted">{user.email}</td>
                          <td className="border text-muted">{user.phone}</td>
                          <td className="border text-muted">{user.subject}</td>
                          <td className="border text-muted">{user.message}</td>
                          <td className="border">
                            {/* {user.status} */}
                            <span
                              className={`badge ${
                                user.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm bg-danger"
                              onClick={() => handleDelete(user.customer_id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
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

export default Users;
