import React from "react";
import { formatDate } from "../api/products.js";
import { Link } from "react-router-dom";

const Card = ({product}) => {
 


  return (
    <>
    <Link to={`/product/${product._id}`} >
  <div className="w-[286px] h-[264px] border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer">
        <div className="flex justify-center items-center h-[170px] p-1.75 ">
          <img
            src={product.image_url || "car_image.jpeg"}
            className=" h-full w-full object-cover "
            alt=""
          />
        </div>
        <div className=" px-[16px] py-[8px] h-[94px] ">
          <div className="text-[20px] font-bold">₹{product.price}</div>
          <div>{product.title}</div>
          <div className="justify-between flex ">
            <div className="w-[150px] text-gray-400 text-[13px] text-ellipsis overflow-hidden whitespace-nowrap">
            {product.description}
            </div>
            <div className="text-[13px]">{formatDate(product.createdAt)}</div>
          </div>
        </div>
      </div>
    </Link>
    
    </>
  );
};
export default Card;
