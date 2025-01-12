import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getBrand } from "../../Redux/Actioncreators/BrandActionCreators";
import { Link } from "react-router-dom";

export default function BrandSlice() {
  let [brand, setBrand] = useState([]);
  let dispatch = useDispatch();
  let BrandStateData = useSelector((state) => state.BrandStateData);

  useEffect(() => {
    (() => {
      dispatch(getBrand());
      if (BrandStateData.length) setBrand(BrandStateData);
    })();
  }, [BrandStateData.length]);

  let options = {
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 6,
      },
      1400: {
        items: 7,
      },
    },
    dots: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    nav: true,
    navText: [
      '<button class="btn btn-warning" style="width:80px;border-radius:80px"><i class="fa fa-arrow-right"></i></button>',
      '<button class="btn btn-warning" style="width:80px;border-radius:80px"><i class="fa fa-arrow-left"></i></button>',
    ],
  };

  return (
    <>
      <div className="container-fluid testimonial py-5">
        <div className="container pb-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.2s"
            style={{ maxWidth: "800px" }}
          >
            <h1 className="display-4 mb-4">Featured Restaurants</h1>
          </div>
          <OwlCarousel className="owl-theme" {...options}>
            {brand.map((item, index) => {
              return (
                <div className="card p-2 mx-1" key={index}>
                  <Link to={`/menu?br=${item.name}`}>
                    <img
                      src={item.pic}
                      height={150}
                      width={150}
                      alt="Featured Resturants"
                    />
                  </Link>
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      </div>
    </>
  );
}
