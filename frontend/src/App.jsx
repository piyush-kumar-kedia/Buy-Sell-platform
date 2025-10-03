import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import NotFound from "./pages/notFound.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";


function App() {
  const [cards, setCards] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/create" element={<CreateProduct/>} />
        <Route path="*" element={<NotFound/>} />  
      </Routes>
    </Router>
  );
}
export default App;
