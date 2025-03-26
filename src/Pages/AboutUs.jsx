import React, { useState } from "react";
import Header from "../Component/Header";
import SidePanel from "../Component/SidePanel";
import Footer from "../Component/Footer";

function AboutUs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="container-fluid position-relative bg-white d-flex p-0">
        {isSidebarOpen && <SidePanel />}
        <div className={`content ${isSidebarOpen ? "content-open" : ""}`}>
          <Header onToggleSidebar={toggleSidebar} />
          <h1>This is About us page</h1>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AboutUs;
