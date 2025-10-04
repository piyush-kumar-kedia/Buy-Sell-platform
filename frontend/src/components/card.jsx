import React from "react";
import { formatDate, deleteProductById } from "../api/products.js";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";

const Card = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault(); // stop link navigation
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductById(product._id); // delete from backend
        if (onDelete) onDelete(product._id); // tell parent to remove from state
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault(); // prevent navigating to product page when clicking edit
    navigate(`/updateProduct/${product._id}`); // go to update page
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="w-[286px] h-[264px] border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer relative">
        {/* Product Image */}
        <div className="flex justify-center items-center h-[170px] p-1.5">
          <img
            src={product.image_url || "car_image.jpeg"}
            className="h-full w-full object-cover rounded-t-lg"
            alt={product.title}
          />
        </div>

        {/* Product Info */}
        <div className="px-[16px] py-[8px] h-[94px]">
          <div className="flex justify-between items-center">
            <div className="text-[20px] font-bold">₹{product.price}</div>

            {/* Buttons */}
            <div className="flex items-center gap-1">
              {/* Edit Button */}
              <button
                onClick={handleEdit}
                className="p-1 rounded-full hover:bg-blue-100"
              >
                <Edit size={18} className="text-blue-500" />
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="p-1 rounded-full hover:bg-red-100"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>

          <div className="text-[15px] font-medium truncate">{product.title}</div>

          <div className="justify-between flex mt-1">
            <div className="w-[150px] text-gray-400 text-[13px] overflow-hidden whitespace-nowrap">
              {product.description}
            </div>
            <div className="text-[13px]">{formatDate(product.createdAt)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
