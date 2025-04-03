import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";
import axios from "axios";

function AddBlogDetails() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //for fetch active blog category
  const [blog, SetBlog] = useState([]);

  useEffect(() => {
    fetchBlogcategory();
  }, []);

  const fetchBlogcategory = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/blog-category/get-active`
      );
      if (response.status === 200) {
        SetBlog(response.data.data);
        // console.log("The fetch Active Blog Category are", response.data);
      }
    } catch (error) {
      toast.error(
        `Error fetching blog category: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // section for add blog details
  const [formData, setFormData] = useState({
    blog_id: "",
    image: null,
    title: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  });

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

    if (formData.blog_id === "") {
      toast.error("Please select a blog category");
      return;
    }

    if (!formData.image === "") {
      toast.error("Image field is required");
      return;
    }

    if (formData.title === "") {
      toast.error("Title field is required");
      return;
    }

    if (formData.description === "") {
      toast.error("Description field is required");
      return;
    }

    if (formData.meta_title === "") {
      toast.error("Meta title field is required");
      return;
    }

    if (formData.meta_description === "") {
      toast.error("Meta description field is required");
      return;
    }

    if (formData.meta_keywords === "") {
      toast.error("Meta keywords field is required");
      return;
    }

    const formDataToSend = new FormData();

    // Append files if selected
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Append text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/blog-detail/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Blog Details Added Successfully !");
        setFormData({
          blog_id: "",
          image: null,
          title: "",
          description: "",
          meta_title: "",
          meta_description: "",
          meta_keywords: "",
        });
      }
    } catch (error) {
      toast.error("Failed to add blog details. Please try again.");
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
              <div className="col-sm-12 col-xl-6">
                <div className="bg-light rounded h-100 p-4">
                  <h6 className="mb-4">Add Sub Service Details</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <select
                        className="form-control"
                        id="blog_id"
                        name="blog_id"
                        value={formData.blog_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Blog Category</option>
                        {blog.length > 0 ? (
                          blog.map((item) => (
                            <option key={item.blog_id} value={item.blog_id}>
                              {item.category}
                            </option>
                          ))
                        ) : (
                          <option disabled>
                            No Active Blog Category Available
                          </option>
                        )}
                      </select>
                      <label htmlFor="blog_id">Select Blog Category</label>
                    </div>
                    {/* image field*/}
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        placeholder="Upload image"
                      />
                      <label htmlFor="image">Upload image</label>
                    </div>
                    {/* Title field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter Title"
                      />
                      <label htmlFor="title">Title</label>
                    </div>

                    {/* Description Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                      />
                      <label htmlFor="description">Description</label>
                    </div>

                    {/* Sort description Field */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="meta_title"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        placeholder="Enter Meta Title"
                      />
                      <label htmlFor="meta_title">Meta Title</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="meta_description"
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        placeholder="Enter Meta Description"
                      />
                      <label htmlFor="meta_description">Meta Discription</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="meta_keywords"
                        name="meta_keywords"
                        value={formData.meta_keywords}
                        onChange={handleChange}
                        placeholder="Enter Meta Title"
                      />
                      <label htmlFor="meta_keywords">Meta Keywords</label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Add Details
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

export default AddBlogDetails;
