import React, { useEffect, useState } from "react";
import { getProductById } from "../api/products.js";
import { useParams } from "react-router-dom";
import { formatDate } from "../api/products.js";

const Product = () => {
  const {id}= useParams();
  const [product,setProduct]= useState(null);
  const [loading,setLoading]=useState(true);

   useEffect(()=>{
    const fetchProduct= async()=>{
      try{
        const res= await getProductById(id);
        setProduct(res);
      }
      catch(err){
        console.log("Error fetching product:",err);
      }finally{
        setLoading(false);
      }
    }
    fetchProduct();
   },[id]);
   if(loading){
    return <p>Product loading...</p>
  }
  return (
    <>
    {product? (
      <div className=" border-[2px] border-gray-400 rounded-[10px] shadow-lg my-[60px] mx-[250px]">
        <div className="flex justify-center items-center h-[450px] ">
          <img src={ product.image_url || "../public/car_image.jpeg" }alt="" className="h-full w-full object-cover shadow-xl rounded-t-[10px]" />
        </div>
        <div className=" px-[16px] py-[8px]">
          <div className="justify-between flex ">
            <div className="text-3xl font-bold text-green-700">₹{product.price}</div>
            <div className="font-semibold text-gray-800">
              By: PIYUSH KUMAR KEDIA
            </div>
          </div>

          <div className="text-2xl font-bold">{product.title}</div>
          <div className="text-gray-500 mb-4">(Category- {product.category})</div>

          <div className="justify-between flex items-end pb-[10px] ">
            <div className="w-3xl text-gray-400 text-[13px]">
              {product.description}
            </div>
            <div className="text-sm text-gray-500">Posted on: {formatDate(product.createdAt)}</div>
          </div>
        </div>
      </div>
    ):(
       <p>Product Not Found</p>
    )}
    </>
  )

//    {loading? (
//     return 
//     (<p>Product loading...</p>)
//       ):(product?(
//         return
// ()
    
//       ):(
//         return (
         
//         )
//       ))}
};
export default Product;
