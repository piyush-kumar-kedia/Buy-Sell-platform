import React, { useState } from "react";
import { createProduct } from "../api/products.js";

const CreateProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image_url: ""
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
      setMessage("Product created successfully!");
      console.log(product);
      // optionally redirect or reset form
      setForm({ title: "", description: "", price: "", category: "", image_url: "" });
    } catch (err) {
      setMessage("Error creating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="border p-2 rounded"/>
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required className="border p-2 rounded"/>
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="border p-2 rounded"/>
        <input type="text" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} className="border p-2 rounded"/>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CreateProduct;
