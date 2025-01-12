import React from "react";
import BrandSlice from "./BrandSlice";

export default function Features() {
  return (
    <>
      {/* <!-- Feature Start --> */}

      <div className="container-fluid feature bg-light py-5">
        <BrandSlice />
        <div className="container py-2">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.2s"
            style={{ maxWidth: "800px" }}
          >
            <h1 className="display-4 mb-4">How does it work</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="feature-item p-4 pt-0">
                <div className="feature-icon p-4 mb-4">
                  <i className="fas fa-map-marker-alt fa-3x"></i>
                </div>
                <h4 className="mb-4">Select location</h4>
                <p className="mb-4">
                  Choose the location where your food will be delivered.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="feature-item p-4 pt-0">
                <div className="feature-icon p-4 mb-4">
                  <i className="fas fa-concierge-bell fa-3x"></i>
                </div>
                <h4 className="mb-4">Choose order</h4>
                <p className="mb-4">
                  Check over hundreds of menus to pick your favorite food
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="feature-item p-4 pt-0">
                <div className="feature-icon p-4 mb-4">
                  <i className="fab fa-amazon-pay fa-3x"></i>
                </div>
                <h4 className="mb-4">Payment</h4>
                <p className="mb-4">
                  It's quick, safe, and simple. Select several methods of
                  payment
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
              data-wow-delay="0.8s"
            >
              <div className="feature-item p-4 pt-0">
                <div className="feature-icon p-4 mb-4">
                  <i className="fa fa-headphones fa-3x"></i>
                </div>
                <h4 className="mb-4">Enjoy meals</h4>
                <p className="mb-4">
                  Food is made and delivered directly to your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Feature End -->  */}
    </>
  );
}
