const Product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Path2D.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ message: "firm not found" });
        }
        const product = new Product({
            productName, price, category, bestSeller, description, image, firm: firm._id
        })
        const savedProduct = await product.save()

        firm.products.push(savedProduct);

        await firm.save()

        res.status(200).json(savedProduct);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}
module.exports = { addProduct }