import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainContent from "@/components/layout/MainContent";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainContent />}>
          <Route path="" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
