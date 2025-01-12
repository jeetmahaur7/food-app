import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Testimonials from "./Partials/Testimonials";
import ProductContainer from "./Partials/ProductContainer";
import Features from "./Partials/Features";

import { getProduct } from "../Redux/Actioncreators/ProductActionCreators";
import { getCategory } from "../Redux/Actioncreators/CategoryActionCreators";

export default function Home() {
  let [products, setProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let options = {
    items: 1,
    dots: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
  };

  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let CategoryStateData = useSelector((state) => state.CategoryStateData);

  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) setProducts(ProductStateData);
    })();
  }, [ProductStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getCategory());
      if (CategoryStateData.length) setCategory(CategoryStateData);
    })();
  }, [CategoryStateData.length]);
  return (
    <>
      {/* <!-- Carousel Start --> */}
      <div className="header-carousel">
        <OwlCarousel className="owl-theme" {...options}>
          <div className="header-carousel-item bg-warning">
            <div className="carousel-caption">
              <div className="container">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-7 animated fadeInLeft">
                    <div className="text-sm-center text-md-start">
                      <h4 className="text-white text-uppercase fw-bold mb-4">
                        Welcome To Apna Rasoi
                      </h4>
                      <h1 className="display-1 text-white mb-4">
                        Are you starving?
                      </h1>
                      <p className="mb-5 fs-5">
                        Within a few clicks, find meals thatare accessible near
                        you
                      </p>
                      <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                        <Link
                          className="btn btn-dark rounded-pill py-3 px-4 px-md-5 ms-2"
                          to="/menu"
                        >
                          Order Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 animated fadeInRight">
                    <div
                      className="calrousel-img"
                      style={{ objectFit: "cover" }}
                    >
                      <img
                        src="img/carousel-1.png"
                        className="img-fluid w-100"
                        alt="Carousel"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-carousel-item bg-warning">
            <div className="carousel-caption">
              <div className="container">
                <div className="row gy-4 gy-lg-0 gx-0 gx-lg-5 align-items-center">
                  <div className="col-lg-5 animated fadeInLeft">
                    <div className="calrousel-img">
                      <img
                        src="img/carousel-2.png"
                        className="img-fluid w-100"
                        alt="Carousel"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 animated fadeInRight">
                    <div className="text-sm-center text-md-end">
                      <h4 className="text-white text-uppercase fw-bold mb-4">
                        Welcome To Apna Rasoi
                      </h4>
                      <h1 className="display-1 text-white mb-4">
                        Are you ready to order with the best deals?
                      </h1>
                      <div className="d-flex justify-content-center justify-content-md-end flex-shrink-0 mb-4">
                        <Link
                          className="btn btn-dark rounded-pill py-3 px-4 px-md-5 ms-2"
                          to="/menu"
                        >
                          Order Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </div>
      {/* <!-- Carousel End --> */}

      <ProductContainer title="Popular items" data={products.slice(0, 4)} />
      <Features />
      <Testimonials />
    </>
  );
}
