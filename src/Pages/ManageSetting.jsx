import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../Constant";

function ManageSetting() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [accountsetting, Setaccountsetting] = useState([]);

  useEffect(() => {
    fetchAccountsetting();
  }, []);

  const fetchAccountsetting = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/account-settings/get-setting`
      );
      if (response.status === 200) {
        Setaccountsetting(response.data.data);
      }
    } catch (error) {
      toast.error(
        `Error fetching account setting: ${
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
            <div className="bg-light rounded h-100 p-4">
              {/* <div className="d-flex justify-content-between align-items-center"> */}
              <h6 className="mb-4">Manage Testimonial</h6>
              {/* <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search name..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div> */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">Logo</th>
                      <th scope="col">Favicon</th>
                      <th scope="col">Email One</th>
                      <th scope="col">Email Two</th>
                      <th scope="col">Mobile Number</th>
                      <th scope="col">Copy Right</th>
                      <th scope="col">Map Iframe</th>
                      <th scope="col">Facebook</th>
                      <th scope="col">Linkedin</th>
                      <th scope="col">X</th>
                      <th scope="col">Instagram</th>
                      <th scope="col">You Tube</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsetting.length > 0 ? (
                      accountsetting.map((accountsetting, index) => (
                        <tr key={accountsetting.id}>
                          <th>{index + 1}</th>
                          <td>{accountsetting.logo}</td>
                          <td>{accountsetting.favicon}</td>
                          <td>{accountsetting.email_one}</td>
                          <td>{accountsetting.email_two}</td>
                          <td>{accountsetting.mobile_number}</td>
                          <td>{accountsetting.copyright}</td>
                          <td>{accountsetting.map_iframe}</td>
                          <td>{accountsetting.facebook}</td>
                          <td>{accountsetting.linkedin}</td>
                          <td>{accountsetting.twitter}</td>
                          <td>{accountsetting.instagram}</td>
                          <td>{accountsetting.youtube}</td>
                          <td>
                            {/* <button
                              className="btn btn-danger btn-sm bg-danger"
                              onClick={() =>
                                handleDelete(testimonial.testimonial_id)
                              }
                            >
                              <i className="bi bi-trash"></i>
                            </button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No details found!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* <div className="d-flex justify-content-end align-items-center mt-3">
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
              </div> */}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ManageSetting;
