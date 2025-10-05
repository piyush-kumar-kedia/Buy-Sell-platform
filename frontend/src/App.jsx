import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import NotFound from "./pages/notFound.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
