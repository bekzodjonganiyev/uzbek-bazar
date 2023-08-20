import { lazy} from "react"

// TODO - make one function for lazy import 
const HomePage = lazy(() => import("./HomePage").then(module => ({default: module.HomePage})))

const TopProducts = lazy(() => import("./top-products/TopProducts").then(module => ({default: module.TopProducts})))
// category will make
// brends will make

const Cart = lazy(() => import("./cart/Cart").then(module => ({default: module.Cart})))
const Compare = lazy(() => import("./compare/Compare").then(module => ({default: module.Compare})))
const Favourite = lazy(() => import("./favourite/Favourite").then(module => ({default: module.Favourite})))

const SellWithUs = lazy(() => import("./sell-with-us/SellWithUs").then(module => ({default: module.SellWithUs})))
const ContactUs = lazy(() => import("./contact-us/ContactUs").then(module => ({default: module.ContactUs})))
const AboutUs = lazy(() => import("./about-us/AboutUs").then(module => ({default: module.AboutUs})))
const Faq = lazy(() => import("./faq/Faq").then(module => ({default: module.Faq})))
const FourZeroFour = lazy(() => import("./404/404").then(module => ({default: module.FourZeroFour})))

const Sellers = lazy(() => import("./seller/Sellers").then(module => ({default: module.Sellers})))
const SellerDetails = lazy(() => import("./seller/SellerDetails").then(module => ({default: module.SellerDetails})))

export {
    HomePage,
    TopProducts,
    Compare,
    Favourite,
    SellWithUs,
    ContactUs,
    AboutUs,
    Faq,
    FourZeroFour,
    Sellers,
    SellerDetails, 
    Cart
}