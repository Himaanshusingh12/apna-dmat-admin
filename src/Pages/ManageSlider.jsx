import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../Constant";

function ManageSlider() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [slider, Setslider] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchslider();
  }, [currentPage]);

  const fetchslider = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/slider/get`, {
        params: { page: currentPage, limit: limit },
      });
      if (response.status === 200) {
        Setslider(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      toast.error(
        `Error fetching slider detail: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/slider/status/${id}`);
      toast.success("Slider status updated successfully!");
      fetchslider();
    } catch (error) {
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
        `${BACKEND_URL}/api/slider/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Slider deleted successfully!");
        fetchserviceDetail();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
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
                <h5 className="fw-bold text-primary">Manage Slider</h5>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered align-middle text-left  table-striped">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th scope="col" className="text-center">
                        S. No.
                      </th>
                      <th scope="col">image One</th>
                      <th scope="col">image Two</th>
                      <th scope="col">image Three</th>
                      <th scope="col">image Four</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slider.length > 0 ? (
                      slider.map((slider, index) => (
                        <tr key={slider.slider_id} className="table-light">
                          <th className="text-center">{index + 1}</th>

                          <td className="border text-muted">
                            <img
                              src={slider.image}
                              alt="Blog"
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </td>
                          <td className="border text-muted">
                            <img
                              src={slider.image2}
                              alt="Blog"
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </td>
                          <td className="border text-muted">
                            <img
                              src={slider.image3}
                              alt="Blog"
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </td>
                          <td className="border text-muted">
                            <img
                              src={slider.image4}
                              alt="Blog"
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </td>

                          <td className="border text-center">
                            <span
                              className={`badge ${
                                slider.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {slider.status}
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
                                  slider.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "26px", cursor: "pointer" }}
                                onClick={() => toggleStatus(slider.slider_id)}
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() => handleDelete(slider.slider_id)}
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
                          No Slider Found!
                        </td>
                      </tr>
                    )}
                  </tbody>
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

export default ManageSlider;
