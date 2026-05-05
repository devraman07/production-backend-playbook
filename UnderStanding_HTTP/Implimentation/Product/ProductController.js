import { Products } from "./ProductData.js";

export const AddProduct = (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be greater than zero" });
    }

    Products.push({ name, price, description });

    const id = `p${Products.length}`;

    Products[Products.length - 1].id = id;

    return res.status(201).json({
      message: "product added successfully",
      success: true,
      data: {
        id: id,
        name: Products[Products.length - 1].name,
        price: Products[Products.length - 1].price,
        description: Products[Products.length - 1].description,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetProducts = (req, res) => {
  try {
    return res.status(200).json({
      message: "Products Found successfully",
      success: true,
      data: Products,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetProductById = (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const product = Products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.set("X-Total-Count", products.length);
    res.set("Cache-Control", "public, max-age=60");
    res.set("Vary", "Accept");

    return res.status(200).json({
      message: "Product Found successfully",
      success: true,
      data: product,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateProduct = (req, res) => {
  try {
    const { id } = parseInt(req.params.id);
    const { name, price, description } = req.body;
    const product = Products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteproduct = (req, res) => {
  try {
    const { id } = parseInt(req.params.id);
    const productIndex = Products.findIndex((p) => p.id === id);
    if (!productIndex) {
      return res.status(404).json({ message: "Product not found" });
    }
    Products.splice(productIndex, 1);
    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
