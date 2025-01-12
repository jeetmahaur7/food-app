import { all } from "redux-saga/effects";
import categorySagas from "./CategorySagas";
import brandSagas from "./BrandSagas";
import productSagas from "./ProductSagas";
import testimonialSagas from "./TestimonialSagas";
import cartSagas from "./CartSagas";
import wishlistSagas from "./WishlistSagas";
import checkoutSagas from "./CheckoutSagas";
import newsletterSagas from "./NewsletterSagas";
import contactUsSagas from "./ContactUsSagas";
export default function* RootSaga() {
  yield all([
    categorySagas(),
    brandSagas(),
    productSagas(),
    testimonialSagas(),
    cartSagas(),
    wishlistSagas(),
    checkoutSagas(),
    newsletterSagas(),
    contactUsSagas(),
  ]);
}
