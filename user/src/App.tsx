import { Suspense, Fragment } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home, Cart, Checkout, AboutUs, Compare, ContactUs, Faq, Favourite, FourZeroFour, SellWithUs, SellerDetails, Sellers, TopProducts, ProductList, ProductView } from "@/pages/public";
import { MainContent } from "@/components/layout/MainContent";
import { PageLoader } from "@/components/loaders";

function App(): JSX.Element {

  return (
    <Fragment>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Suspense fallback={<PageLoader />}><MainContent /></Suspense>}>
              <Route index element={<Home />} />
              <Route path="/sellers" element={<Sellers />} />
              <Route path="/seller/details/:id" element={<SellerDetails />} />

              <Route path="/top-products" element={<TopProducts />} />
              <Route path="/catalog" element={<ProductList />} />
              <Route path="/catalog/:category" element={<ProductList />} />
              <Route path="/product/details/:id" element={<ProductView />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/favourites" element={<Favourite />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/sell-with-us" element={<SellWithUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="*" element={<FourZeroFour />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </Fragment >
  );
}

export default App;
