import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import Card from "../components/card.jsx";
import { getAllProducts } from "../api/products.js";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // using it to track loading state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  // Functions to pass to Navbar
  const handleSearch = (term) => setSearchTerm(term);
  const handleCategoryChange = (category) => setSelectedCategory(category);

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  // Get unique categories from products for the filter dropdown
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <>
      <Navbar
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        selectedCategory={selectedCategory}
      />

      <div className="mx-[120px] my-[10px] grid grid-cols-4 gap-y-8">
        {loading ? (
          <p className="text-center col-span-4 text-gray-500">
            Loading products...
          </p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product._id} product={product} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">
            No products found
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
