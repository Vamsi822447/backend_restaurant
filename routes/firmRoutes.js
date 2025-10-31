const express = require('express');
const router = express.Router();
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post('/add-firm', verifyToken, upload.single('image'), firmController.addFirm);
router.delete('/delete-firm', firmController.deleteFirm);

module.exports = router;
