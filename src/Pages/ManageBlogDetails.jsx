import React, { useEffect, useState } from "react";
import Footer from "../Component/Footer";
import SidePanel from "../Component/SidePanel";
import Header from "../Component/Header";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { stripHtml } from "string-strip-html";

function ManageBlogDetails() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [blogdetail, Setblogdetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selecteddetail, setSelectedDetail] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const limit = 10;

  useEffect(() => {
    fetchBlogdetail();
  }, [currentPage]);

  const fetchBlogdetail = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/blog-detail/get`, {
        params: { page: currentPage, limit: limit },
      });
      if (response.status === 200) {
        Setblogdetail(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      toast.error(
        `Error fetching  service detail: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // delete blog details
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/blog-detail/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Blog detail deleted successfully!");
        fetchBlogdetail();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Toggle Active/Inactive status
  const toggleStatus = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/blog-detail/status/${id}`);
      toast.success("Blog detail status updated successfully!");
      fetchBlogdetail();
    } catch (error) {
      toast.error(
        `Error updating status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // search sub service
  const searchBlogdetail = async (query) => {
    if (!query.trim()) {
      fetchBlogdetail();
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/blog-detail/search`,
        {
          params: { query: query },
        }
      );

      if (response.status === 200) {
        Setblogdetail(response.data.data);
      }
    } catch (error) {
      toast.error("Error searching blog detail");
    }
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      fetchBlogdetail();
    } else {
      searchBlogdetail(query);
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle Service Update with Image Upload
  const handleUpdateBlog = async () => {
    if (!selecteddetail) return;
    // console.log("Selected Detail:", selecteddetail);
    try {
      const formData = new FormData();
      formData.append("title", selecteddetail.title);
      formData.append("description", selecteddetail.description);
      formData.append("meta_title", selecteddetail.meta_title);
      formData.append("meta_description", selecteddetail.meta_description);
      formData.append("meta_keywords", selecteddetail.meta_keywords);
      formData.append("slug", selecteddetail.slug);
      if (imageFile) {
        // console.log("Image File:", imageFile);
        formData.append("image", imageFile);
      }
      await axios.put(
        `${BACKEND_URL}/api/blog-detail/edit/${selecteddetail.blogdetail_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Blog detail updated successfully!");
      fetchBlogdetail();
      setSelectedDetail(null);
      setImageFile(null);
    } catch (error) {
      // console.error("Update Error:", error);
      toast.error("Error updating blog detail");
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
                <h5 className="fw-bold text-primary">Manage Blog Detail</h5>
                <input
                  type="text"
                  className="form-control w-25 border-primary shadow-sm"
                  placeholder="Search Subservice..."
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
                      <th>Blog Category</th>
                      <th scope="col">image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Meta title</th>
                      <th scope="col">Meta Description</th>
                      <th scope="col">Meta Keywords</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogdetail.length > 0 ? (
                      blogdetail.map((blogdetail, index) => (
                        <tr
                          key={blogdetail.blogdetail_id}
                          className="table-light"
                        >
                          <th className="text-center">{index + 1}</th>
                          <td className="border text-muted">
                            {blogdetail.blog_category}
                          </td>
                          <td className="border text-muted">
                            <img
                              src={blogdetail.image}
                              alt="Blog"
                              style={{
                                width: "100px",
                                height: "auto",
                                borderRadius: "5px",
                              }}
                            />
                          </td>
                          <td className="border text-muted">
                            {blogdetail.title}
                          </td>

                          <td
                            className="border text-muted"
                            title={stripHtml(blogdetail.description)}
                          >
                            {stripHtml(blogdetail.description).length > 100
                              ? stripHtml(blogdetail.description).slice(
                                  0,
                                  100
                                ) + "..."
                              : stripHtml(blogdetail.description)}
                          </td>

                          <td className="border fw-bold text-secondary">
                            {blogdetail.meta_title}
                          </td>
                          <td
                            className="border text-muted"
                            title={stripHtml(blogdetail.meta_description)}
                          >
                            {stripHtml(blogdetail.meta_description).length > 100
                              ? stripHtml(blogdetail.meta_description).slice(
                                  0,
                                  100
                                ) + "..."
                              : stripHtml(blogdetail.meta_description)}
                          </td>
                          <td className="border text-muted">
                            {blogdetail.meta_keywords}
                          </td>
                          <td className="border text-center">
                            <span
                              className={`badge ${
                                blogdetail.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              } p-2`}
                            >
                              {blogdetail.status}
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
                                  blogdetail.status === "Active"
                                    ? "fa-toggle-on text-success"
                                    : "fa-toggle-off text-danger"
                                }`}
                                style={{ fontSize: "26px", cursor: "pointer" }}
                                onClick={() =>
                                  toggleStatus(blogdetail.blogdetail_id)
                                }
                              ></i>
                              <i
                                className="fa fa-edit text-primary"
                                style={{
                                  fontSize: "24px",
                                  cursor: "pointer",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#editServiceModal"
                                onClick={() => setSelectedDetail(blogdetail)}
                              ></i>
                              <i
                                className="fa fa-trash text-danger"
                                style={{ fontSize: "24px", cursor: "pointer" }}
                                onClick={() =>
                                  handleDelete(blogdetail.blogdetail_id)
                                }
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
                          No Blog details Found!
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {/*Edit blogdetials Modal */}
                  <div
                    className="modal fade"
                    id="editServiceModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-fullscreen">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">Edit Blog detail</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setSelectedDetail(null)}
                          ></button>
                        </div>
                        <div className="modal-body bg-primary text-white">
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
                            <label className="form-label">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selecteddetail?.title || ""}
                              onChange={(e) =>
                                setSelectedDetail({
                                  ...selecteddetail,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <JoditEditor
                              value={selecteddetail?.description || ""}
                              onChange={(newContent) =>
                                setSelectedDetail({
                                  ...selecteddetail,
                                  description: newContent,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Meta Title</label>
                            <input
                              className="form-control"
                              value={selecteddetail?.meta_title || ""}
                              onChange={(e) =>
                                setSelectedDetail({
                                  ...selecteddetail,
                                  meta_title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Meta Description
                            </label>
                            <input
                              className="form-control"
                              value={selecteddetail?.meta_description || ""}
                              onChange={(e) =>
                                setSelectedDetail({
                                  ...selecteddetail,
                                  meta_description: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Meta Keywords</label>
                            <input
                              className="form-control"
                              value={selecteddetail?.meta_keywords || ""}
                              onChange={(e) =>
                                setSelectedDetail({
                                  ...selecteddetail,
                                  meta_keywords: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Slug</label>
                            <input
                              className="form-control"
                              value={selecteddetail?.slug || ""}
                              onChange={(e) =>
                                setSelectedDetail({
                                  ...selecteddetail,
                                  slug: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => setSelectedDetail(null)}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpdateBlog}
                            data-bs-dismiss="modal"
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

export default ManageBlogDetails;
