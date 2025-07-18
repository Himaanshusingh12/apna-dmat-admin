import React, { useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../Constant";

function AddUnlistedShares() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [formData, setFormData] = useState({
    company_logo: null,
    company_name: "",
    share_price: "",
    industry: "",
    estimated_valuation: "",
    investment_opportunity: "",
    projected_ipo_date: "",
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = [
      "company_logo",
      "company_name",
      "share_price",
      "industry",
      "estimated_valuation",
      "investment_opportunity",
      "projected_ipo_date",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.replace(/_/g, " ")} is required`);
        return;
      }
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.company_logo);
    formDataToSend.append("company_name", formData.company_name);
    formDataToSend.append("share_price", formData.share_price);
    formDataToSend.append("industry", formData.industry);
    formDataToSend.append("estimated_valuation", formData.estimated_valuation);
    formDataToSend.append(
      "investment_opportunity",
      formData.investment_opportunity
    );
    formDataToSend.append("projected_ipo_date", formData.projected_ipo_date);
    try {
      await axios.post(
        `${BACKEND_URL}/api/unlisted-shares/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Unlisted shares added successfully");
      setFormData({
        company_logo: null,
        company_name: "",
        share_price: "",
        industry: "",
        estimated_valuation: "",
        investment_opportunity: "",
        projected_ipo_date: "",
      });
    } catch (err) {
      toast.error("Error Adding Unlisted Shares");
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
                  <h6 className="mb-4">Add Unlisted Shares</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="company_logo"
                        name="company_logo"
                        onChange={handleFileChange}
                        placeholder="Upload Company Logo"
                      />
                      <label htmlFor="company_logo">Upload Company Logo</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="Enter Company Name"
                      />
                      <label htmlFor="company_name">Company Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="share_price"
                        name="share_price"
                        value={formData.share_price}
                        onChange={handleChange}
                        placeholder="Enter Share Price"
                      />
                      <label htmlFor="share_price">Share Price</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="industry"
                        value={formData.industry}
                        name="industry"
                        onChange={handleChange}
                        placeholder="Enter Industry"
                      />
                      <label htmlFor="industry">Industry</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="estimated_valuation"
                        name="estimated_valuation"
                        value={formData.estimated_valuation}
                        onChange={handleChange}
                        placeholder="Enter Estimated Valuation"
                      />
                      <label htmlFor="estimated_valuation">
                        Estimated Valuation
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="investment_opportunity"
                        name="investment_opportunity"
                        value={formData.investment_opportunity}
                        onChange={handleChange}
                        placeholder="Enter Investment Opportunity"
                      />
                      <label htmlFor="investment_opportunity">
                        Investment Opportunity
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="date"
                        className="form-control"
                        id="projected_ipo_date"
                        name="projected_ipo_date"
                        value={formData.projected_ipo_date}
                        onChange={handleChange}
                        placeholder="Enter IPO Date"
                      />
                      <label htmlFor="projected_ipo_date">
                        Projected IPO Date
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add Unlisted Shares
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

export default AddUnlistedShares;
