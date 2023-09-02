import { lazy} from "react"

// TODO - make one function for lazy import 
const Home = lazy(() => import("./Home").then(module => ({default: module.Home})))

const TopProducts = lazy(() => import("./top-products/TopProducts").then(module => ({default: module.TopProducts})))
const ProductList = lazy(() => import("./product/ProductList").then(module => ({default: module.ProductList})))
const ProductView = lazy(() => import("./product/ProductView").then(module => ({default: module.ProductView})))
// brends will make

const Cart = lazy(() => import("./cart/Cart").then(module => ({default: module.Cart})))
const Compare = lazy(() => import("./compare/Compare").then(module => ({default: module.Compare})))
const Favourite = lazy(() => import("./favourite/Favourite").then(module => ({default: module.Favourite})))
const Checkout = lazy(() => import("./checkout/Checkout").then(module => ({default: module.Checkout})))

const SellWithUs = lazy(() => import("./sell-with-us/SellWithUs").then(module => ({default: module.SellWithUs})))
const ContactUs = lazy(() => import("./contact-us/ContactUs").then(module => ({default: module.ContactUs})))
const AboutUs = lazy(() => import("./about-us/AboutUs").then(module => ({default: module.AboutUs})))
const Faq = lazy(() => import("./faq/Faq").then(module => ({default: module.Faq})))
const FourZeroFour = lazy(() => import("./404/404").then(module => ({default: module.FourZeroFour})))

const Sellers = lazy(() => import("./seller/Sellers").then(module => ({default: module.Sellers})))
const SellerDetails = lazy(() => import("./seller/SellerDetails").then(module => ({default: module.SellerDetails})))

export {
    Home,
    TopProducts,
    ProductList,
    ProductView,
    Compare,
    Favourite,
    SellWithUs,
    ContactUs,
    AboutUs,
    Faq,
    FourZeroFour,
    Sellers,
    SellerDetails, 
    Cart,
    Checkout
}