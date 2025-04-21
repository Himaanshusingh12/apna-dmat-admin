import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //section for fetch total count of service inquiry users
  const [count, Setcount] = useState({});
  useEffect(() => {
    fetchserviceCount();
  }, []);

  const fetchserviceCount = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/popup-detail/user-count`
      );
      if (response.status === 200) {
        Setcount(response.data);
        // console.log("the fetch count is", response.data);
      }
    } catch (error) {
      toast.error(
        `Error fetching service count: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // section for fetch Inquiry users
  const [user, Setuser] = useState({});

  useEffect(() => {
    fetchuserCount();
  }, []);

  const fetchuserCount = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/user-count`);
      if (response.status === 200) {
        Setuser(response.data);
        console.log("the fetch count is", response.data);
      }
    } catch (error) {
      toast.error(
        `Error fetching service count: ${
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
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <Link
                to="/popup-details"
                className="col-sm-6 col-xl-3 text-decoration-none"
              >
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-users fa-3x text-primary" />
                  <div className="ms-3">
                    <p className="mb-2 text-dark">Service Users</p>
                    <h6 className="mb-0 text-dark">{count.totalUsers || 0}</h6>
                  </div>
                </div>
              </Link>

              <Link
                to="/users"
                className="col-sm-6 col-xl-3 text-decoration-none"
              >
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-users fa-3x text-primary" />
                  <div className="ms-3">
                    <p className="mb-2 text-dark">Inquiry Users</p>
                    <h6 className="mb-0 text-dark">{user.totalUsers || 0}</h6>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* Sale & Revenue End */}

          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
