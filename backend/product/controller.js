import Product from "./model.js";

export const createProduct = async (req, res) => {
  const userId = req.user.id;
  const { title, description, price, category, image_url, owner } = req.body;
  try {
    const product = new Product({
      title,
      description,
      price,
      category,
      image_url,
      owner: userId,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPoduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the owner" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "owner",
      "username email"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category, image_url } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the owner" });
    }

    // Update only the fields provided in the request
    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (image_url !== undefined) product.image_url = image_url;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
