import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api/products.js";
import { Pencil, Home, CheckCircle, XCircle, Loader2 } from "lucide-react";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        setForm({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          image_url: product.image_url || "",
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await updateProduct(id, form);
      setMessage("Product updated successfully!");
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setMessage("Error updating product.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white border rounded-2xl shadow-2xl">
      {/* Page Title */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        <Pencil size={28} className="text-blue-600" />
        Update Product
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
          required
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL (Optional)"
          value={form.image_url}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-md flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Updating...
            </>
          ) : (
            <>
              <Pencil size={18} /> Update Product
            </>
          )}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-5 text-center font-medium flex items-center justify-center gap-2 ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {success ? <CheckCircle size={20} /> : <XCircle size={20} />}
          {message}
        </p>
      )}

      {/* Go to Home Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Home size={20} /> Go to Home
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
