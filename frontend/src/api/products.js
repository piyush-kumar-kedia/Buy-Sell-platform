export const getAllProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/product/");
    const products = await res.json();
    return products;
  } catch (err) {
    console.log("Error in fetching products:", err);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const res = await fetch("http://localhost:3000/product/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      if (res.status === 401) {
        // Not authenticated
        window.alert("❌ You are not an authenticated user, Please login...");
        throw new Error("Not authenticated");
      }
      throw new Error("Failed to create product");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error in creating product:,err");
    throw err;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/product/${id}`);
    if (!res.ok) {
      return null;
    }
    const product = await res.json();
    console.log(product);
    return product;
  } catch (err) {
    console.log("Error in fetching product by id: ", err);
    return null;
  }
};

// Delete product by ID
export const deleteProductById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Not authenticated
        window.alert(
          "❌ You are not an authenticated owner of this product, Please login..."
        );
        throw new Error("Not authenticated");
      } else if (res.status === 403) {
        // Not authenticated
        window.alert("❌ You are not the owner of this product");
        throw new Error("Not authenticated");
      }
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
  const res = await fetch(`http://localhost:3000/product/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Not authenticated
      window.alert("❌ You are not an authenticated user, Please login...");
      throw new Error("Not authenticated");
    } else if (res.status === 403) {
      // Not authenticated
      window.alert("❌ You are not the owner of this product");
      throw new Error("Not authenticated");
    }
    throw new Error("Failed to update product");
  }
  return res.json();
};

export const formatDate = (isoString) => {
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
