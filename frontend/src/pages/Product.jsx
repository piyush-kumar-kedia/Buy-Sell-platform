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
    // Navigate to update product page
    navigate(`/updateProduct/${product._id}`);
  };

  if (loading) return <p>Product loading...</p>;
  if (!product) return <p>Product Not Found</p>;

  return (
    <div className="border-[2px] border-gray-400 rounded-[10px] shadow-lg my-[60px] mx-[250px]">
      {/* Image */}
      <div className="flex justify-center items-center h-[450px]">
        <img
          src={product.image_url || "../public/car_image.jpeg"}
          alt=""
          className="h-full w-full object-cover shadow-xl rounded-t-[10px]"
        />
      </div>

      {/* Product Info */}
      <div className="px-[16px] py-[8px]">
        <div className="justify-between flex items-center">
          <div className="text-3xl font-bold text-green-700">
            ₹{product.price}
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-gray-800">
              By: {product.owner.username}
            </div>
            {/* Edit Button */}
            <button
              onClick={handleEdit}
              className="p-2 rounded-full hover:bg-blue-100"
            >
              <Edit size={20} className="text-blue-500" />
            </button>
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="p-2 rounded-full hover:bg-red-100"
            >
              <Trash2 size={20} className="text-red-500" />
            </button>
          </div>
        </div>

        <div className="text-2xl font-bold mt-2">{product.title}</div>
        <div className="text-gray-500 mb-4">
          (Category - {product.category})
        </div>

        <div className="justify-between flex items-end pb-[10px]">
          <div className="w-3xl text-gray-400 text-[13px]">
            {product.description}
          </div>
          <div className="text-sm text-gray-500">
            Posted on: {formatDate(product.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
