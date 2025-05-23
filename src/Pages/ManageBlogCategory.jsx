import React, { useEffect, useState } from "react";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";

function ManageBlogCategory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [blog, Setblog] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const limit = 10;

  useEffect(() => {
    fetchBlogcategory();
  }, [currentPage]);

  const fetchBlogcategory = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/blog-category/get`, {
        params: { page: currentPage, limit: limit },
      });
      if (response.status === 200) {
        Setblog(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        // console.log("The Fetched Blog categories are:", response.data);
      }
    } catch (error) {
      toast.error(
        `Error fetching blog categories: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // search Blog categories
  const searchBlogcategory = async (query) => {
    if (!query.trim()) {
      fetchBlogcategory();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/blog-category/search`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        Setblog(response.data.data);
      }
    } catch (error) {
      // console.error("Error searching blog category:", error);
      toast.error("Error searching blog category");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchBlogcategory();
    } else {
      searchBlogcategory(query);
    }
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/blog-category/status/${id}`);
      toast.success("Category status updated successfully!");
      fetchBlogcategory();
    } catch (error) {
      toast.error(
        `Error updating status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/blog-category/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Blog category deleted successfully");
        fetchBlogcategory();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle Blog category Update
  const handleUpdatecategory = async () => {
    if (!selectedCategory) return;

    try {
      const formData = new FormData();
      formData.append("category", selectedCategory.category);
      formData.append("slug", selectedCategory.slug);
      formData.append("meta_title", selectedCategory.meta_title || "");
      formData.append(
        "meta_description",
        selectedCategory.meta_description || ""
      );
      formData.append("meta_keywords", selectedCategory.meta_keywords || "");
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.put(
        `${BACKEND_URL}/api/blog-category/edit/${selectedCategory.blog_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Blog category updated successfully!");
      fetchBlogcategory();
      setSelectedCategory(null);
      setImageFile(null);
    } catch (error) {
      toast.error("Error updating blog category");
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
                <h6 className="fw-bold text-primary">Manage Blog Category</h6>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search Category..."
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
                      <th scope="col">Categories</th>
                      <th scope="col">Image</th>
                      <th scope="col">Slug</th>
                      <th scope="col">Mega Title</th>
                      <th scope="col">Meta Description</th>
                      <th scope="col">Meta Keywords</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blog.length > 0 ? (
                      blog.map((blog, index) => (
                        <tr key={blog.blog_id} className="table-light">
                          <th>{index + 1}</th>
                          <td className="border text-muted">{blog.category}</td>
                          <td>
                            <img
                              src={blog.image}
                              alt=""
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </td>
                          <td className="border text-muted">{blog.slug}</td>
                          <td className="border text-muted">
                            {blog.meta_title}
                          </td>
                          <td className="border text-muted">
                            {blog.meta_description}
                          </td>
                          <td className="border text-muted">
                            {blog.meta_keywords}
                          </td>
                          <td className="border">
                            <span
                              className={`badge ${
                                blog.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {blog.status}
                            </span>
                          </td>
                          <td>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <i
                                className={`fa ${
                                  blog.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() => toggleStatus(blog.blog_id)}
                              ></i>

                              <i
                                className="fa fa-edit text-primary"
                                style={{
                                  fontSize: "24px",
                                  cursor: "pointer",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#editServiceModal"
                                onClick={() => setSelectedCategory(blog)}
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() => handleDelete(blog.blog_id)}
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
                          No Blog Category found!
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {/*Edit Service Modal */}
                  <div
                    className="modal fade"
                    id="editServiceModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">Edit Blog Category</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-primary text-white">
                          <div className="mb-3">
                            <label className="form-label">Category</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedCategory?.category || ""}
                              onChange={(e) =>
                                setSelectedCategory({
                                  ...selectedCategory,
                                  category: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Upload New Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleImageChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Slug</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedCategory?.slug || ""}
                              onChange={(e) =>
                                setSelectedCategory({
                                  ...selectedCategory,
                                  slug: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Meta Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedCategory?.meta_title || ""}
                              onChange={(e) =>
                                setSelectedCategory({
                                  ...selectedCategory,
                                  meta_title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Meta Description
                            </label>
                            <textarea
                              type="text"
                              className="form-control"
                              value={selectedCategory?.meta_description || ""}
                              onChange={(e) =>
                                setSelectedCategory({
                                  ...selectedCategory,
                                  meta_description: e.target.value,
                                })
                              }
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Meta Keywords</label>
                            <textarea
                              type="text"
                              className="form-control"
                              value={selectedCategory?.meta_keywords || ""}
                              onChange={(e) =>
                                setSelectedCategory({
                                  ...selectedCategory,
                                  meta_keywords: e.target.value,
                                })
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpdatecategory}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default ManageBlogCategory;
