import React, { useEffect, useState } from "react";
import { getProductById, deleteProductById } from "../api/products.js";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../api/products.js";
import { Trash2, Edit } from "lucide-react";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res);
      } catch (err) {
        console.log("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductById(product._id);
        navigate("/"); // redirect to home
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/updateProduct/${product._id}`);
  };

  if (loading) return <p className="text-center mt-10">Product loading...</p>;
  if (!product) return <p className="text-center mt-10">Product Not Found</p>;

  return (
    <div className="border-[2px] border-gray-400 rounded-lg shadow-lg my-8 mx-4 md:mx-16 lg:mx-40">
      {/* Image */}
      <div className="flex justify-center items-center w-full h-64 sm:h-80 md:h-96">
        <img
          src={product.image_url || "/car_image.jpeg"}
          alt={product.title}
          className="h-full w-full object-cover shadow-xl rounded-t-lg"
        />
      </div>

      {/* Product Info */}
      <div className="px-4 py-4 md:px-6 md:py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-2xl md:text-3xl font-bold text-green-700 mb-2 md:mb-0">
            ₹{product.price}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="font-semibold text-gray-800">
              By: {product.owner.username}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="p-2 rounded-full hover:bg-blue-100"
              >
                <Edit size={20} className="text-blue-500" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-full hover:bg-red-100"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-xl md:text-2xl font-bold mt-3">{product.title}</div>
        <div className="text-gray-500 mt-1 mb-3">
          (Category - {product.category})
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0">
          <div className="text-gray-400 text-sm sm:text-[13px]">{product.description}</div>
          <div className="text-sm text-gray-500">
            Posted on: {formatDate(product.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
