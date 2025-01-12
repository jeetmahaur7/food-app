import { combineReducers } from "@reduxjs/toolkit";
import CategoryReducer from "./CategoryReducer";
import BrandReducer from "./BrandReducer";
import ProductReducer from "./ProductReducer";
import TestimonialReducer from "./TestimonialReducer";
import CartReducer from "./CartReducer";
import WishlistReducer from "./WishlistReducer";
import CheckoutReducer from "./CheckoutReducer";
import NewsletterReducer from "./NewsletterReducer";
import ContactUsReducer from "./ContactUsReducer";

export default combineReducers({
  CategoryStateData: CategoryReducer,
  BrandStateData: BrandReducer,
  ProductStateData: ProductReducer,
  TestimonialStateData: TestimonialReducer,
  CartStateData: CartReducer,
  WishlistStateData: WishlistReducer,
  CheckoutStateData: CheckoutReducer,
  NewsletterStateData: NewsletterReducer,
  ContactUsStateData: ContactUsReducer,
});
