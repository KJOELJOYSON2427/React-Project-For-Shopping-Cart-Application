import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartListPage from "./pages/Cart";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/product-list" element={<ProductListPage/>}/>
        <Route path="/product-details/:id" element={<ProductDetails/>}/>
        <Route path="/cartPage" element={<CartListPage/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
