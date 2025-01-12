import React from "react";
import { Link } from "react-router-dom";

export default function ProductContainer({ title, data }) {
  return (
    <>
      {/* <!-- Service Start --> */}
      <div className="container-fluid service py-3">
        <div className="container py-5">
          {title ? (
            <div
              className="text-center mx-auto pb-5 wow fadeInUp"
              data-wow-delay="0.2s"
              style={{ maxWidth: "800px" }}
            >
              <h1 className="display-4 mb-4">{title}</h1>
            </div>
          ) : (
            ""
          )}
          <div className="row g-4 justify-content-center">
            {data?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="service-item">
                    <div className="service-img">
                      <img
                        src={item.pic}
                        style={{ height: 200 }}
                        className="img-fluid rounded-top w-100"
                        alt="Item"
                      />
                    </div>
                    <div className="service-content p-4">
                      <div className="service-content-inner">
                        <Link
                          to={`/product/${item.id}`}
                          style={{ height: 50 }}
                          className="d-inline-block h4 mb-4"
                        >
                          {item.name}
                        </Link>
                        <p className="mb-4">
                          <del className="text-danger">
                            &#8377;{item.basePrice}
                          </del>{" "}
                          &#8377;{item.finalPrice}{" "}
                          <sup>{item.discount}% off</sup>
                        </p>
                        <Link
                          className="btn btn-warning rounded-pill py-2 px-4"
                          to={`/product/${item.id}`}
                        >
                          Order Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {title ? (
              <div
                className="col-12 text-center wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <Link
                  className="btn btn-warning rounded-pill py-3 px-5"
                  to="/menu"
                >
                  More Items
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* <!-- Service End -->  */}
    </>
  );
}
