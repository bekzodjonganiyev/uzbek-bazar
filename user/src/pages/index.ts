import { lazy} from "react"

// TODO - make one function for lazy import  
const Home = lazy(() => import("./public/Home").then(module => ({default: module.Home})))

const TopProducts = lazy(() => import("./public/product/TopProducts").then(module => ({default: module.TopProducts})))
const ProductList = lazy(() => import("./public/product/ProductList").then(module => ({default: module.ProductList})))
const ProductView = lazy(() => import("./public/product/ProductView").then(module => ({default: module.ProductView})))
// brends will make

const Cart = lazy(() => import("./public/cart/Cart").then(module => ({default: module.Cart})))
const Compare = lazy(() => import("./public/compare/Compare").then(module => ({default: module.Compare})))
const Favourite = lazy(() => import("./public/favourite/Favourite").then(module => ({default: module.Favourite})))
const Checkout = lazy(() => import("./public/checkout/Checkout").then(module => ({default: module.Checkout})))

const SellWithUs = lazy(() => import("./public/sell-with-us/SellWithUs").then(module => ({default: module.SellWithUs})))
const ContactUs = lazy(() => import("./public/contact-us/ContactUs").then(module => ({default: module.ContactUs})))
const AboutUs = lazy(() => import("./public/about-us/AboutUs").then(module => ({default: module.AboutUs})))
const Faq = lazy(() => import("./public/faq/Faq").then(module => ({default: module.Faq})))
const SearchPage = lazy(() => import("./public/search/SearchPage").then(module => ({default: module.SearchPage})))
const FourZeroFour = lazy(() => import("./public/404/404").then(module => ({default: module.FourZeroFour})))

const Sellers = lazy(() => import("./public/seller/Sellers").then(module => ({default: module.Sellers})))
const SellerDetails = lazy(() => import("./public/seller/SellerDetails").then(module => ({default: module.SellerDetails})))

const UserProfile = lazy(() => import("./private/UserProfile").then(module => ({default: module.UserProfile})))
const UserProfileSettings = lazy(() => import("./private/UserProfileSettings").then(module => ({default: module.UserProfileSettings})))
const UserProfileOrders = lazy(() => import("./private/UserProfileOrders").then(module => ({default: module.UserProfileOrders})))
const Login = lazy(() => import("./public/auth/Login").then(module => ({default: module.Login})))
const SignUp = lazy(() => import("./public/auth/SignUp").then(module => ({default: module.SignUp})))


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
    Checkout,
    UserProfile,
    Login,
    SearchPage,
    SignUp,
    UserProfileOrders,
    UserProfileSettings
}