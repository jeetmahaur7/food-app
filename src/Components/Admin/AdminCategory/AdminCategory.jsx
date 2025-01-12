import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Breadcrum from "../../Partials/Breadcrum";
import Sidebar from "../Sidebar";
import {
  getCategory,
  deleteCategory,
} from "../../../Redux/Actioncreators/CategoryActionCreators";

export default function AdminCategory() {
  let [data, setData] = useState([]);
  let dispatch = useDispatch();
  let CategoryStateData = useSelector((state) => state.CategoryStateData);

  function deleteItem(id) {
    if (window.confirm("Did you really want to delete that item ")) {
      dispatch(deleteCategory({ id: id }));
      getAPIData();
    }
  }

  function getAPIData() {
    dispatch(getCategory());
    if (CategoryStateData.length) {
      setData(CategoryStateData);
      setTimeout(() => {
        $("#dataTable").DataTable();
      }, 1000);
    } else setData([]);
  }

  useEffect(() => {
    getAPIData();
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
              <Link to="/admin/category/create">
                <i className="fa fa-plus text-dark float-end"></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <table
                className="table table-bordered display"
                id="dataTable"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Active</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td
                          className={`${
                            item.active ? "text-success" : "text-danger"
                          }`}
                        >
                          {item.active ? "Yes" : "No"}
                        </td>
                        <td>
                          <Link
                            to={`/admin/category/update/${item.id}`}
                            className="btn"
                          >
                            <i className="fa fa-edit text-dark"></i>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => deleteItem(item.id)}
                          >
                            <i className="fa fa-trash text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
