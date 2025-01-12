import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Menu from "./Menu";
import Contact from "./Contact";
import Error404 from "./Error404";
import Product from "./Product";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";

import Navbar from "./Partials/Navbar";
import Footer from "./Partials/Footer";

import AdminHome from "./Admin/AdminHome/AdminHome";

import AdminCategory from "./Admin/AdminCategory/AdminCategory";
import AdminCreateCategory from "./Admin/AdminCategory/AdminCreateCategory";
import AdminUpdateCategory from "./Admin/AdminCategory/AdminUpdateCategory";

import AdminBrand from "./Admin/AdminBrand/AdminBrand";
import AdminCreateBrand from "./Admin/AdminBrand/AdminCreateBrand";
import AdminUpdateBrand from "./Admin/AdminBrand/AdminUpdateBrand";

import AdminProduct from "./Admin/AdminProduct/AdminProduct";
import AdminCreateProduct from "./Admin/AdminProduct/AdminCreateProduct";
import AdminUpdateProduct from "./Admin/AdminProduct/AdminUpdateProduct";

import AdminTestimonial from "./Admin/AdminTestimonial/AdminTestimonial";
import AdminCreateTestimonial from "./Admin/AdminTestimonial/AdminCreateTestimonial";
import AdminUpdateTestimonial from "./Admin/AdminTestimonial/AdminUpdateTestimonial";

import AdminNewsletter from "./Admin/AdminNewsletter/AdminNewsletter";
import AdminUsers from "./Admin/AdminUsers/AdminUsers";

import AdminContactUs from "./Admin/AdminContactUs/AdminContactUs";
import AdminContactUsShow from "./Admin/AdminContactUs/AdminContactUsShow";

import AdminCheckout from "./Admin/AdminCheckout/AdminCheckout";
import AdminCheckoutShow from "./Admin/AdminCheckout/AdminCheckoutShow";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}

        <Route path="" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Routes */}
        {localStorage.getItem("login") ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </>
        ) : (
          ""
        )}

        {/* Admin Routes */}
        {localStorage.getItem("login") &&
        localStorage.getItem("role") === "Admin" ? (
          <>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/category" element={<AdminCategory />} />
            <Route path="/admin/category/create" element={<AdminCreateCategory />}/>
            <Route path="/admin/category/update/:id" element={<AdminUpdateCategory />}/>

            <Route path="/admin/brand" element={<AdminBrand />} />
            <Route path="/admin/brand/create" element={<AdminCreateBrand />} />
            <Route path="/admin/brand/update/:id" element={<AdminUpdateBrand />}/>

            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/product/create" element={<AdminCreateProduct />}/>
            <Route path="/admin/product/update/:id" element={<AdminUpdateProduct />}/>

            <Route path="/admin/testimonial" element={<AdminTestimonial />} />
            <Route path="/admin/testimonial/create" element={<AdminCreateTestimonial />}/>
            <Route path="/admin/testimonial/update/:id" element={<AdminUpdateTestimonial />}/>

            <Route path="/admin/newsletter" element={<AdminNewsletter />} />
            <Route path="/admin/users" element={<AdminUsers />} />

            <Route path="/admin/contactus" element={<AdminContactUs />} />
            <Route path="/admin/contactus/show/:id" element={<AdminContactUsShow />}/>

            <Route path="/admin/checkouts" element={<AdminCheckout />} />
            <Route path="/admin/checkouts/show/:id" element={<AdminCheckoutShow />}/>

          </>
        ) : (
          ""
        )}

        <Route path="/*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
