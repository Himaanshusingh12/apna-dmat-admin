import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import SidePanel from "./Component/SidePanel";
import PNF from "./Pages/PNF";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTestimonial from "./Pages/AddTestimonial";
import ManageTestimonial from "./Pages/ManageTestimonial";
import AccountSetting from "./Pages/AccountSetting";
import ManageSetting from "./Pages/ManageSetting";
import AddService from "./Pages/AddService";
import ManageService from "./Pages/ManageService";
import AddSubService from "./Pages/AddSubService";
import ManageSubService from "./Pages/ManageSubService";
import AddServiceDetails from "./Pages/AddServiceDetails";
import ManageServiceDetails from "./Pages/ManageServiceDetails";
import AboutUs from "./Pages/AboutUs";
import TermsCondition from "./Pages/TermsCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Managetermscondition from "./Pages/Managetermscondition";
import ManagePrivacyPolicy from "./Pages/ManagePrivacyPolicy";
import BlogCategory from "./Pages/BlogCategory";
import ManageBlogCategory from "./Pages/ManageBlogCategory";

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <SidePanel /> */}
      {/* <PNF /> */}
      {/* <Footer /> */}

      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Dashboard />
              </>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <>
                <Users />
              </>
            }
          ></Route>
          <Route
            path="/add-testimonial"
            element={
              <>
                <AddTestimonial />
              </>
            }
          ></Route>
          <Route
            path="/manage-testimonial"
            element={
              <>
                <ManageTestimonial />
              </>
            }
          ></Route>
          <Route
            path="/account-setting"
            element={
              <>
                <AccountSetting />
              </>
            }
          ></Route>
          <Route
            path="/manage-setting"
            element={
              <>
                <ManageSetting />
              </>
            }
          ></Route>
          <Route
            path="/add-service"
            element={
              <>
                <AddService />
              </>
            }
          ></Route>
          <Route
            path="/manage-service"
            element={
              <>
                <ManageService />
              </>
            }
          ></Route>
          <Route
            path="/add-subservice"
            element={
              <>
                <AddSubService />
              </>
            }
          ></Route>
          <Route
            path="/manage-subservice"
            element={
              <>
                <ManageSubService />
              </>
            }
          ></Route>
          <Route
            path="/add-servicedetails"
            element={
              <>
                <AddServiceDetails />
              </>
            }
          ></Route>
          <Route
            path="/manage-servicedetails"
            element={
              <>
                <ManageServiceDetails />
              </>
            }
          ></Route>
          <Route
            path="/about-us"
            element={
              <>
                <AboutUs />
              </>
            }
          ></Route>
          <Route
            path="/add-terms&condition"
            element={
              <>
                <TermsCondition />
              </>
            }
          ></Route>
          <Route
            path="/manage-terms&condition"
            element={
              <>
                <Managetermscondition />
              </>
            }
          ></Route>
          <Route
            path="/add-privacypolicy"
            element={
              <>
                <PrivacyPolicy />
              </>
            }
          ></Route>
          <Route
            path="/manage-privacypolicy"
            element={
              <>
                <ManagePrivacyPolicy />
              </>
            }
          ></Route>
          <Route
            path="/add-category"
            element={
              <>
                <BlogCategory />
              </>
            }
          ></Route>
          <Route
            path="/manage-blogcategory"
            element={
              <>
                <ManageBlogCategory />
              </>
            }
          ></Route>
          <Route
            path="*"
            element={
              <>
                <PNF />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
