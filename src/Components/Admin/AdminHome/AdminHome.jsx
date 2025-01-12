import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrum from "../../Partials/Breadcrum";
import Sidebar from "../Sidebar";

export default function AdminHome() {
  let [user, setUser] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let response = await fetch("/users", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      response = await response.json();
      if (response) {
        let item = response.find(
          (x) => x.id === localStorage.getItem("userid")
        );
        if (item) setUser(item);
        else navigate("/login");
      }
    })();
  }, []);

  return (
    <>
      <Breadcrum title="Admin" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <div className="row">
              <div className="col-md-6">
                {user?.pic ? (
                  <img
                    src={user.pic}
                    height={350}
                    width="100%"
                    alt="Buyer Pic"
                  />
                ) : (
                  <img
                    src="/img/user.jpg"
                    height={380}
                    width="100%"
                    alt="Buyer Pic"
                  />
                )}
              </div>
              <div className="col-md-6">
                <h5 className="bg-warning text-center p-2">Admin Home Page</h5>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <th>User Name</th>
                      <td>{user.username}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>+91 {user.phone}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Link
                          to="/update-profile"
                          className="btn btn-warning w-100"
                        >
                          Update Profile
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
