export const getAllProducts= async()=>{
    try{
        const res= await fetch("http://localhost:3000/product/");
        const products= await res.json();
        return products;
    }
    catch(err){
console.log("Error in fetching products:", err);
return [];
    }
};

export const createProduct= async(productData)=>{
try{
const res=await fetch("http://localhost:3000/product/",{
  method: "POST",
  headers:{
    "Content-Type": "application/json",
  },
  body: JSON.stringify(productData),
  }
);
 const data= await res.json();
 return data;
}
catch(err){
  console.log("Error in creating product:,err");
  throw err;
}
};

export const getProductById= async(id)=>{
    try{
        const res = await fetch(`http://localhost:3000/product/${id}`);
        if(!res.ok){
          return null;
        }
        const product= await res.json();
        return product;
    }
    catch(err){
      console.log("Error in fetching product by id: ", err);
      return null; 
    }
};

export const formatDate= (isoString)=>{
     const date = new Date(isoString);
  const today = new Date();
    if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleDateString("en-GB");
  }
  };