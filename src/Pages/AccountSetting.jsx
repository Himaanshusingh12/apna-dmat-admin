import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function AccountSetting() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [formData, setFormData] = useState({
    logo: null,
    favicon: null,
    email_one: "",
    email_two: "",
    address: "",
    mobile_number: "",
    copyright: "",
    map_iframe: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  const [savedData, setSavedData] = useState(null);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/account-settings/get-setting`
        );
        if (response.status === 200 && response.data.data.length > 0) {
          setFormData(response.data.data[0]);
        }
      } catch (error) {
        // console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append files if selected
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }
    if (formData.favicon) {
      formDataToSend.append("favicon", formData.favicon);
    }

    // Append text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "logo" && key !== "favicon") {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/account-settings/update-setting`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        if (response.data.type === "insert") {
          toast.success("Account Setting Added Successfully !");
        } else {
          toast.success("Account settings updated successfully!");
        }
      }
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
      // console.error("Error submitting form:", error);
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
              <div className="col-sm-12">
                <div className="bg-light rounded h-100 p-4">
                  <h6 className="mb-4">Account Setting</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control"
                            id="logo"
                            name="logo"
                            onChange={handleFileChange}
                            placeholder="Upload Logo"
                          />
                          <label htmlFor="logo">Upload Logo</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control"
                            id="favicon"
                            name="favicon"
                            onChange={handleFileChange}
                            placeholder="Favicon"
                          />
                          <label htmlFor="favicon">Favicon</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email_one"
                            name="email_one"
                            value={formData.email_one}
                            onChange={handleChange}
                            placeholder="Enter Email One"
                          />
                          <label htmlFor="emailOne">Email One</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email_two"
                            name="email_two"
                            value={formData.email_two}
                            onChange={handleChange}
                            placeholder="Enter Email Two"
                          />
                          <label htmlFor="emailTwo">Email Two</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter Email Two"
                          />
                          <label htmlFor="address">Address</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="url"
                            className="form-control"
                            id="facebook"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleChange}
                            placeholder="Enter Facebook Link"
                          />
                          <label htmlFor="facebook">Facebook</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="url"
                            className="form-control"
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="Enter LinkedIn Link"
                          />
                          <label htmlFor="linkedin">LinkedIn</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="url"
                            className="form-control"
                            id="twitter"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            placeholder="Enter Twitter Link"
                          />
                          <label htmlFor="twitter">X</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="url"
                            className="form-control"
                            id="instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="Enter Instagram Link"
                          />
                          <label htmlFor="instagram">Instagram</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="url"
                            className="form-control"
                            id="youtube"
                            name="youtube"
                            value={formData.youtube}
                            onChange={handleChange}
                            placeholder="Enter YouTube Link"
                          />
                          <label htmlFor="youtube">YouTube</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="copyright"
                            name="copyright"
                            value={formData.copyright}
                            onChange={handleChange}
                            placeholder="Enter Copyright Text"
                          />
                          <label htmlFor="copyright">Copy Right</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <input
                            type="tel"
                            className="form-control"
                            id="mobile_number"
                            name="mobile_number"
                            value={formData.mobile_number}
                            onChange={handleChange}
                            placeholder="Enter Mobile Number"
                          />
                          <label htmlFor="mobileNumber">Mobile Number</label>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            id="map_iframe"
                            name="map_iframe"
                            rows="3"
                            value={formData.map_iframe}
                            onChange={handleChange}
                            placeholder="Enter Map Iframe"
                          ></textarea>
                          <label htmlFor="mapIframe">Map Iframe</label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Settings
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

export default AccountSetting;
