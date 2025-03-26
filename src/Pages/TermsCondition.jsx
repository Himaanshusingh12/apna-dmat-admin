import React, { useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../Constant";
import axios from "axios";

function TermsCondition() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [formData, SetformData] = useState({
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetformData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.content === "") {
      toast.error("Field is required");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/terms-condition/add`, formData);
      toast.success("Terms & Condition added successfully");
      SetformData({
        content: "",
      });
    } catch (err) {
      toast.error("Error adding terms & conditon");
      console.log(err);
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
              <div className="col-sm-12 col-xl-6">
                <div className="bg-light rounded h-100 p-4">
                  <h6 className="mb-4">Terms & Condition</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <textarea
                        className="form-control"
                        id="termsContent"
                        value={formData.content}
                        onChange={handleChange}
                        name="content"
                        placeholder="Enter Terms & Conditions"
                      ></textarea>
                      <label htmlFor="content">Terms & Condition</label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add Terms & Codition
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default TermsCondition;
