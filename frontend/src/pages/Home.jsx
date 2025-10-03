import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import Product from "./Product.jsx";
import Card from "../components/card.jsx";
import { getAllProducts } from "../api/products.js";

const Home= ()=>{
const [products,setProducts]= useState([]);

useEffect(()=>{
 const fetchProducts= async()=>{
  const data= await getAllProducts();
  console.log(data);
  setProducts(data);
 };
 fetchProducts();
},[]);

 return (
    <>
    <Navbar/>
    <div className="mx-[120px] my-[10px] grid grid-cols-4 gap-y-8">
        {products && products.length>0?(
          products.map((product) => {
          return <Card key={product._id} product={product} />;
        })
        ):(
            <p>Loading products...</p>
        )}
        
      </div>
    </>
 )
}
export default Home;


{/* <Navbar />
      <div className="mx-[120px] my-[10px] grid grid-cols-4 gap-y-8">
        {cards.map(() => {
          return <Card />;
        })}
      </div>
      <button
        onClick={() => {
          setCards([...cards, cards.length + 1]);
        }}
      >
        Add Card
      </button> */}