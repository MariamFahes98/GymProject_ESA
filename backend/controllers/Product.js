const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const imageFileName = req.file ? req.file.filename : null; // Get the filename of the uploaded image
        const product = new Product({
            ...req.body,
            image: imageFileName // Save only the filename
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = req.file.filename; // Update with the new filename
        }
        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the count of all product
exports.getProductCount = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.status(200).json({ count: productCount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getTopProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ quantity: -1 }).limit(4);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






