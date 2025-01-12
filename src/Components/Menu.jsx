import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Breadcrum from "./Partials/Breadcrum";
import { getProduct } from "../Redux/Actioncreators/ProductActionCreators";
import { getCategory } from "../Redux/Actioncreators/CategoryActionCreators";
import { getBrand } from "../Redux/Actioncreators/BrandActionCreators";
import ProductContainer from "./Partials/ProductContainer";
import { event } from "jquery";

export default function Menu() {
  let [products, setProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let [brand, setBrand] = useState([]);
  let [ca, setCa] = useState("All");
  let [br, setBr] = useState("All");
  let [flag, setFlag] = useState(false);
  let [min, setMin] = useState(0);
  let [max, setMax] = useState(0);
  let [search, setSearch] = useState("");

  let location = useLocation();

  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let CategoryStateData = useSelector((state) => state.CategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);

  function filterData(ca, br, min = -1, max = -1) {
    let data = [];
    if (ca === "All" && br === "All") data = ProductStateData;
    else if (ca !== "All" && br === "All")
      data = ProductStateData.filter((x) => x.category === ca);
    else if (ca === "All" && br !== "All")
      data = ProductStateData.filter((x) => x.brand === br);
    else
      data = ProductStateData.filter(
        (x) => x.category === ca && x.brand === br
      );

    if (min !== -1 && max !== -1)
      data = data.filter((x) => x.finalPrice >= min && x.finalPrice <= max);
    setProducts(data);
  }

  function sortFilter(option) {
    if (option === "1")
      setProducts(products.sort((x, y) => y.id.localeCompare(x.id)));
    else if (option === "2")
      setProducts(products.sort((x, y) => y.finalPrice - x.finalPrice));
    else setProducts(products.sort((x, y) => x.finalPrice - y.finalPrice));

    setFlag(!flag);
  }

  function postSearch(e) {
    e.preventDefault();
    let ch = search.toLowerCase();
    setProducts(
      ProductStateData.filter(
        (x) =>
          x.name.toLowerCase().includes(ch) ||
          x.category.toLowerCase() === ch ||
          x.brand.toLowerCase() === ch ||
          x.description?.toLowerCase().includes(ch)
      )
    );
  }

  function searchRecord(search) {
    let ch = search.toLowerCase();
    setProducts(
      ProductStateData.filter(
        (x) =>
          x.name.toLowerCase().includes(ch) ||
          x.category.toLowerCase() === ch ||
          x.brand.toLowerCase() === ch ||
          x.description?.toLowerCase().includes(ch)
      )
    );
  }

  function priceFilter(e) {
    e.preventDefault();
    filterData(ca, br, min, max);
  }

  useEffect(() => {
    (() => {
      dispatch(getProduct());
    })();
  }, [ProductStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getCategory());
      if (CategoryStateData.length) setCategory(CategoryStateData);
    })();
  }, [CategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getBrand());
      if (BrandStateData.length) setBrand(BrandStateData);
    })();
  }, [BrandStateData.length]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setCa(query.get("ca") ?? "All");
    setBr(query.get("br") ?? "All");
    if (query.get("search")) searchRecord(query.get("search"));
    else filterData(query.get("ca") ?? "All", query.get("br") ?? "All");
  }, [location, ProductStateData.length]);

  return (
    <>
      <Breadcrum title="Menu" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-2">
            <div className="list-group mb-3">
              <h5
                className="list-group-item list-group-item-action bg-warning"
                aria-current="true"
              >
                Category
              </h5>
              <Link
                to={`/menu?ca=All&br=${br}`}
                className="list-group-item list-group-item-action"
              >
                All
              </Link>
              {category.map((item, index) => {
                if (item.active)
                  return (
                    <Link
                      to={`/menu?ca=${item.name}&br=${br}`}
                      key={index}
                      className="list-group-item list-group-item-action"
                    >
                      {item.name}
                    </Link>
                  );
              })}
            </div>

            <div className="list-group mb-3">
              <h5
                className="list-group-item list-group-item-action bg-warning"
                aria-current="true"
              >
                Brand
              </h5>
              <Link
                to={`/menu?ca=${ca}&br=all`}
                className="list-group-item list-group-item-action"
              >
                All
              </Link>
              {brand.map((item, index) => {
                if (item.active)
                  return (
                    <Link
                      to={`/menu?ca=${ca}&br=${item.name}`}
                      key={index}
                      className="list-group-item list-group-item-action"
                    >
                      {item.name}
                    </Link>
                  );
              })}
            </div>
            <div className="mb-3">
              <h5 className="bg-warning text-center p-2 text-dark">
                Price Filter
              </h5>
              <form onSubmit={priceFilter}>
                <div className="mb-3">
                  <label>Min Amount</label>
                  <input
                    type="number"
                    name="min"
                    onChange={(e) => setMin(e.target.value)}
                    placeholder="Min Amount"
                    className="form-control border-warning border-2"
                  />
                </div>
                <div className="mb-3">
                  <label>Max Amount</label>
                  <input
                    type="number"
                    name="max"
                    onChange={(e) => setMax(e.target.value)}
                    placeholder="Max Amount"
                    className="form-control border-warning border-2"
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100">
                  Apply Filter
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-10">
            <div className="row">
              <div className="col-md-8">
                <form onSubmit={postSearch}>
                  <div className="btn-group w-100">
                    <input
                      type="text"
                      name="search"
                      onChange={(e) => setSearch(e.target.value)}
                      className="search-input form-control border-warning border-2 w-100"
                      placeholder="Search Item"
                    />
                    <button type="submit" className="btn btn-warning">
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-4">
                <select
                  name="sort"
                  onChange={(e) => sortFilter(e.target.value)}
                  className="form-select border-2"
                >
                  <option value="1">Price Range</option>
                  <option value="2">High to Low</option>
                  <option value="3">Low to High</option>
                </select>
              </div>
            </div>
            <ProductContainer data={products} />
          </div>
        </div>
      </div>
    </>
  );
}
