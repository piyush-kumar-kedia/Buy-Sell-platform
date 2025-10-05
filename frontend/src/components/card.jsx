import React from "react";
import { formatDate, deleteProductById } from "../api/products.js";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";

const Card = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductById(product._id);
        if (onDelete) onDelete(product._id);
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/updateProduct/${product._id}`);
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="w-full sm:w-[286px] border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer relative mb-4 sm:mb-0">
        {/* Product Image */}
        <div className="flex justify-center items-center h-[170px] p-1.5">
          <img
            src={product.image_url || "car_image.jpeg"}
            className="h-full w-full object-cover rounded-t-lg"
            alt={product.title}
          />
        </div>

        {/* Product Info */}
        <div className="px-4 py-2 h-auto">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold sm:text-[20px]">₹{product.price}</div>

            {/* Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleEdit}
                className="p-1 rounded-full hover:bg-blue-100"
              >
                <Edit size={18} className="text-blue-500" />
              </button>

              <button
                onClick={handleDelete}
                className="p-1 rounded-full hover:bg-red-100"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>

          <div className="text-sm sm:text-[15px] font-medium truncate mt-1">
            {product.title}
          </div>

          <div className="flex justify-between mt-1 text-[12px] sm:text-[13px]">
            <div className="w-[120px] sm:w-[150px] text-gray-400 overflow-hidden whitespace-nowrap">
              {product.description}
            </div>
            <div>{formatDate(product.createdAt)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
