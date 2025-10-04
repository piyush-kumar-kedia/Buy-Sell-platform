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

// Delete product by ID
export const deleteProductById = async (id, token) => {
  try {
    const res = await fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`, // ✅ send JWT for auth
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    const data = await res.json();
    return data; 
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};

// Update product by ID
export const updateProduct = async (id, updatedData) => {
  const response = await fetch(`http://localhost:3000/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }
  return response.json();
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