import React, { useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

function PNF() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        {/* <SidePanel /> */}
        {isSidebarOpen && <SidePanel />}
        {/* <div className="content"> */}
        <div className={`content ${isSidebarOpen ? "content-open" : ""}`}>
          {/* <Header /> */}
          <Header onToggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-4 px-4">
            <div className="row vh-100 bg-light rounded align-items-center justify-content-center mx-0">
              <div className="col-md-6 text-center p-4">
                <i className="bi bi-exclamation-triangle display-1 text-primary" />
                <h1 className="display-1 fw-bold">404</h1>
                <h1 className="mb-4">Page Not Found</h1>
                <p className="mb-4">
                  We’re sorry, the page you have looked for does not exist in
                  our website! Maybe go to our home page or try to use a search?
                </p>
                <a className="btn btn-primary rounded-pill py-3 px-5" href>
                  Go Back To Home
                </a>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default PNF;
