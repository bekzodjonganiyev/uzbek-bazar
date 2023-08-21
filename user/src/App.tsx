import { Suspense } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home, Cart, AboutUs, Compare, ContactUs, Faq, Favourite, FourZeroFour, SellWithUs, SellerDetails, Sellers, TopProducts, ProductList, ProductView } from "@/pages/public";
import { MainContent } from "@/components/layout/MainContent";
import { PageLoader } from "@/components/loaders";

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspense fallback={<PageLoader />}><MainContent /></Suspense>}>
          <Route index element={<Home />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/sellers/:id" element={<SellerDetails />} />

          <Route path="/top-products" element={<TopProducts />} />
          <Route path="/katalog/category?" element={<ProductList />} />
          <Route path="/product/details/:id" element={<ProductView />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/compare" element={<Compare />} />

          <Route path="/sell-with-us" element={<SellWithUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<FourZeroFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
