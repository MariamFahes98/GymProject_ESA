const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/Product');


router.get('/count', productController.getProductCount);

router.get('/top-products', productController.getTopProducts);


// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/products')); // Folder where files will be saved
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
  });
  
  const upload = multer({ storage });
  
  // Create a new trainer
  router.post('/', upload.single('image'), productController.createProduct);
  
  // Update a trainer by ID
  router.put('/:id', upload.single('image'), productController.updateProductById);



// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);



// Delete a product by ID
router.delete('/:id', productController.deleteProductById);






module.exports = router;
