import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ProductContainer from "./Partials/ProductContainer";

import { getProduct } from "../Redux/Actioncreators/ProductActionCreators";
import {
  getCart,
  createCart,
} from "../Redux/Actioncreators/CartActionCreators";
import {
  getWishlist,
  createWishlist,
} from "../Redux/Actioncreators/WishlistActionCreators";

export default function Product() {
  let { id } = useParams();
  let [qty, setQty] = useState(1);
  let [product, setProduct] = useState({});
  let [relatedProducts, setRelatedProducts] = useState([]);
  let [carts, setCarts] = useState([]);
  let [wishlist, setWishlist] = useState([]);

  let navigate = useNavigate();

  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let CartStateData = useSelector((state) => state.CartStateData);
  let WishlistStateData = useSelector((state) => state.WishlistStateData);

  function addToCart() {
    let item = carts.find(
      (x) => x.user === localStorage.getItem("userid") && x.product === id
    );
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: id,
        name: product.name,
        brand: product.brand,
        price: product.finalPrice,
        qty: qty,
        total: product.finalPrice * qty,
        pic: product.pic,
      };
      dispatch(createCart({ ...item }));
    }
    navigate("/cart");
  }

  function addToWishlist() {
    let item = wishlist.find(
      (x) => x.user === localStorage.getItem("userid") && x.product === id
    );
    if (!item) {
      item = {
        user: localStorage.getItem("userid"),
        product: id,
        name: product.name,
        brand: product.brand,
        price: product.finalPrice,
        pic: product.pic,
      };
      dispatch(createWishlist({ ...item }));
    }
    navigate("/profile");
  }

  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) {
        let item = ProductStateData.find((x) => x.id === id);
        setProduct(item);
        setRelatedProducts(
          ProductStateData.filter((x) => x.category === item.category)
        );
      }
    })();
  }, [ProductStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getCart());
      if (CartStateData.length) {
        setCarts(
          CartStateData.filter((x) => x.user === localStorage.getItem("userid"))
        );
      }
    })();
  }, [CartStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getWishlist());
      if (WishlistStateData.length) {
        setWishlist(
          WishlistStateData.filter(
            (x) => x.user === localStorage.getItem("userid")
          )
        );
      }
    })();
  }, [WishlistStateData.length]);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6">
            <img src={product.pic} alt="Item Image" height={400} width="100%" />
          </div>
          <div className="col-md-6">
            <h5 className="bg-warning text-light text-center p-2">
              {product.name}
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Category</th>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <th>Brand</th>
                    <td>{product.brand}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>
                      <del className="text-danger">
                        &#8377;{product.basePrice}
                      </del>{" "}
                      &#8377;{product.finalPrice}{" "}
                      <sup>{product.discount}% Off</sup>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex">
                        <div className="d-flex">
                          <button
                            className="btn btn-warning"
                            onClick={() => (qty > 1 ? setQty(qty - 1) : "")}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <p className="mx-3 fs-5 pt-1">{qty}</p>
                          <button
                            className="btn btn-warning"
                            onClick={() =>
                              qty < product.quantity ? setQty(qty + 1) : ""
                            }
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                        <div className="ms-3 btn-group w-100">
                          <button
                            className="btn btn-warning"
                            onClick={addToCart}
                          >
                            <i className="fa fa-shopping-cart"></i> Add to Cart
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={addToWishlist}
                          >
                            <i className="fa fa-heart"></i> Add to Wishlist
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ProductContainer
        title="Related Products"
        data={relatedProducts.slice(0, 10)}
      />
    </>
  );
}
