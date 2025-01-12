import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrum from "../../Partials/Breadcrum";
import formValidator from "../../Validators/formValidator";
import Sidebar from "../Sidebar";
import {
  getCategory,
  updateCategory,
} from "../../../Redux/Actioncreators/CategoryActionCreators";

export default function AdminUpdateCategory() {
  let [allData, setAllData] = useState([]);
  let [data, setData] = useState({
    name: "",
    active: true,
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { id } = useParams();
  let dispatch = useDispatch();
  let CategoryStateData = useSelector((state) => state.CategoryStateData);

  function getInputData(e) {
    var { name, value } = e.target;
    if (name !== "active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: formValidator(e),
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
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) setShow(true);
    else {
      let item = allData.find(
        (x) =>
          x.name?.toLocaleLowerCase() === data.name.toLocaleLowerCase() &&
          x.id !== id
      );
      if (item) {
        setShow(true);
        setErrorMessage((old) => {
          return {
            ...old,
            name: "Category Name is Already Exist",
          };
        });
      } else {
        dispatch(updateCategory({ ...data }));
        navigate("/admin/category");
      }
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getCategory());
      if (CategoryStateData.length) {
        setAllData(CategoryStateData);
        setData(CategoryStateData.find((x) => x.id === id));
      } else setAllData([]);
    })();
  }, [CategoryStateData.length]);

  return (
    <>
      <Breadcrum title="Admin" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <h5 className="bg-warning text-center p-2">
              Category{" "}
              <Link to="/admin/category">
                <i className="fa fa-arrow-left text-dark float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input
                    onChange={getInputData}
                    type="text"
                    name="name"
                    value={data.name}
                    placeholder="Category Name"
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
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    onChange={getInputData}
                    name="active"
                    value={data.active ? "1" : "0"}
                    className={`form-control ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-warning"
                    } border-2`}
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
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
