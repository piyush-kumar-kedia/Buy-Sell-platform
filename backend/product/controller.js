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
}

