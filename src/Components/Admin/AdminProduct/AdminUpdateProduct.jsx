import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Breadcrum from "../../Partials/Breadcrum";

import Sidebar from "../Sidebar";
import formValidator from "../../Validators/formValidator";
import imageValidator from "../../Validators/imageValidator";

import {
  getProduct,
  updateProduct,
} from "../../../Redux/Actioncreators/ProductActionCreators";
import { getCategory } from "../../../Redux/Actioncreators/CategoryActionCreators";
import { getBrand } from "../../../Redux/Actioncreators/BrandActionCreators";

var rte;

export default function AdminUpdateProduct() {
  var refdiv = useRef(null);
  let [category, setCategory] = useState([]);
  let [products, setProducts] = useState([]);
  let [brand, setBrand] = useState([]);

  let [data, setData] = useState({
    name: "",
    category: "",
    brand: "",
    basePrice: "",
    discount: "",
    finalPrice: "",
    pic: "",
    active: true,
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    basePrice: "",
    discount: "",
    pic: "",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { id } = useParams();

  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let CategoryStateData = useSelector((state) => state.CategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);

  function getInputData(e) {
    var name = e.target.name;
    var value = e.target.files
      ? "/products/" + e.target.files[0].name
      : e.target.value;
    if (name !== "active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: name === "pic" ? imageValidator(e) : formValidator(e),
        };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "1" ? true : false) : value,
      };
    });
  }
  function postData(e) {
    e.preventDefault();
    console.log(errorMessage);
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      let basePrice = parseInt(data.basePrice);
      let discount = parseInt(data.discount);
      let finalPrice = parseInt(basePrice - (basePrice * discount) / 100);
      dispatch(
        updateProduct({
          ...data,
          id: id,
          category: data.category === "" ? category[0].name : data.category,
          brand: data.brand === "" ? brand[0].name : data.brand,
          basePrice: basePrice,
          discount: discount,
          finalPrice: finalPrice,
          description: rte.getHTMLCode(),
        })
      );
      navigate("/admin/product");
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) {
        setProducts(ProductStateData);
        let item = ProductStateData.find((x) => x.id === id);
        setData(item);
        rte = new window.RichTextEditor(refdiv.current);
        rte?.setHTMLCode(item.description);
      }
    })();
  }, [ProductStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getCategory());
      if (CategoryStateData.length)
        setCategory(CategoryStateData.filter((x) => x.active === true));
    })();
  }, [CategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getBrand());
      if (BrandStateData.length)
        setBrand(BrandStateData.filter((x) => x.active === true));
    })();
  }, [BrandStateData.length]);

  return (
    <>
      <Breadcrum title="Admin" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-warning text-center p-2 text-dark">
              Product{" "}
              <Link to="/admin/product">
                <i className="fa fa-arrow-left text-dark float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={getInputData}
                  placeholder="Product Name"
                  className={`form-control ${
                    show && errorMessage.name
                      ? "border-danger"
                      : "border-warning"
                  } border-2`}
                />
                {show && errorMessage.name ? (
                  <p className="text-danger text-capitalize">
                    {errorMessage.name}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="row">
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Category*</label>
                  <select
                    name="category"
                    value={data.category}
                    onChange={getInputData}
                    className="form-control border-warning border-2"
                  >
                    {category.map((item, index) => {
                      return <option key={index}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Brand*</label>
                  <select
                    name="brand"
                    value={data.brand}
                    onChange={getInputData}
                    className="form-control border-warning border-2"
                  >
                    {brand.map((item, index) => {
                      return <option key={index}>{item.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Pic*</label>
                  <input
                    type="file"
                    name="pic"
                    onChange={getInputData}
                    className={`form-control ${
                      show && errorMessage.pic
                        ? "border-danger"
                        : "border-warning"
                    } border-2`}
                  />
                  {show && errorMessage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.pic}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-md-3 col-sm-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    value={data.active ? "1" : "0"}
                    onChange={getInputData}
                    className="form-control border-warning border-2"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input
                    type="number"
                    name="basePrice"
                    value={data.basePrice}
                    onChange={getInputData}
                    placeholder="Product Base Price"
                    className={`form-control ${
                      show && errorMessage.basePrice
                        ? "border-danger"
                        : "border-warning"
                    } border-2`}
                  />
                  {show && errorMessage.basePrice ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.basePrice}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Discount*</label>
                  <input
                    type="number"
                    name="discount"
                    value={data.discount}
                    onChange={getInputData}
                    className={`form-control ${
                      show && errorMessage.discount
                        ? "border-danger"
                        : "border-warning"
                    } border-2`}
                    placeholder="Product Discount"
                  />
                  {show && errorMessage.discount ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.discount}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label>Description</label>
                <div ref={refdiv}></div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-warning w-100">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
