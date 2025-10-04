import React, { useState } from "react";
import { createProduct } from "../api/products.js";

const CreateProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const product = await createProduct(form);
      setMessage("✅ Product created successfully!");
      console.log(product);
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        image_url: "",
      });
    } catch (err) {
      setMessage("❌ Error creating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white border rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        🚀 Create New Product
      </h2>
     <form onSubmit={handleSubmit} className="flex flex-col gap-5">
  <label className="font-medium">Product Title <span className="text-red-500">*</span></label>
  <input
    type="text"
    name="title"
    placeholder="Product Title"
    value={form.title}
    onChange={handleChange}
    required
    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  />

  <label className="font-medium">Product Description <span className="text-red-500">*</span></label>
  <textarea
    name="description"
    placeholder="Product Description"
    value={form.description}
    onChange={handleChange}
    required
    rows="3"
    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  />

  <label className="font-medium">Price (₹) <span className="text-red-500">*</span></label>
  <input
    type="number"
    name="price"
    placeholder="Price"
    value={form.price}
    onChange={handleChange}
    required
    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  />

  <label className="font-medium">Category <span className="text-red-500">*</span></label>
  <input
    type="text"
    name="category"
    placeholder="Category"
    value={form.category}
    onChange={handleChange}
    required
    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  />

  <label className="font-medium">Image URL (Optional)</label>
  <input
    type="text"
    name="image_url"
    placeholder="Image URL"
    value={form.image_url}
    onChange={handleChange}
    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  />

  <button
    type="submit"
    disabled={loading}
    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-md"
  >
    {loading ? "⏳ Creating..." : "✨ Create Product"}
  </button>
</form>


      {message && (
        <p
          className={`mt-5 text-center font-medium ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateProduct;
