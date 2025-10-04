import Product from "./model.js"

export const createProduct= async(req,res)=>{
    const {title,description,price,category,image_url, owner}= req.body;
    try{
        const product= new Product({title,description,price,category,image_url,owner});
        await product.save();
        res.status(201).json(product);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

export const getPoduct= async(req,res)=>{
 try{
        const products= await Product.find();
        res.json(products);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

// export const deleteProduct = async(req,res)=>{
//     try{
//         const res= await Product.findByIdAndDelete(req.params.id);

//     }
//     catch(err){

//     }
// }

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ownership check (assuming req.user.id is set after authentication)
    // if (product.user.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized to delete this product" });
    // }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getProductById= async(req,res)=>{
 try{
    const product= await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
 }
 catch(err){
    res.status(500).json({message: err.message});
 }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category, image_url } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update only the fields provided in the request
    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (image_url !== undefined) product.image_url = image_url;

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

