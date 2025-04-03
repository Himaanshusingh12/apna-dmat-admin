import React from "react";

function Footer() {
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light rounded-top p-4">
          <div className="row">
            <div className="col-12 col-sm-6 text-center text-sm-start">
              © <a href="#">Apna Dmat</a>, All Right Reserved.
            </div>
            <div className="col-12 col-sm-6 text-center text-sm-end">
              Designed By <a href="https://codeinweb.com/">Codeinweb</a>
            </div>
          </div>
        </div>
      </div>

      <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i class="bi bi-arrow-up"></i>
      </a>
    </>
  );
}

export default Footer;
