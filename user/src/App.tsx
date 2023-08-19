import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage, CartPage } from "@/pages/public";
import MainContent from "@/components/layout/MainContent";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainContent />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
