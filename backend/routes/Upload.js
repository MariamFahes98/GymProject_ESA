const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/trainers")); // Updated folder path
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage });

// /api/upload
router.post('/', upload.single("image"), (req, res) => {
    res.status(200).json({ message: "Image uploaded", path: req.file.path });
});

module.exports = router;
