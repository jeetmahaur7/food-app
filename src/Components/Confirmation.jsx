import React from "react";
import Breadcrum from "./Partials/Breadcrum";
import { Link } from "react-router-dom";

export default function Confirmation() {
  return (
    <>
      <Breadcrum title="Order is Placed" />
      <div className="container my-3 text-center">
        <h3>Thank You!!!</h3>
        <h4>Your Order Has Been Placed</h4>
        <h5>
          Now You Can Track Your Order and Shipping Details in Profile Section
        </h5>
        <Link to="/menu" className="btn btn-warning">
          Order More
        </Link>
      </div>
    </>
  );
}
