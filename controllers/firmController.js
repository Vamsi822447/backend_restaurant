const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');

const addFirm = async (req, res) => {
    console.log("📩 Request received at addFirm");

    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : req.body.image; // image from multer or fallback

        console.log("🧾 Body:", req.body);
        console.log("📸 File:", req.file);
        console.log("👤 Vendor ID:", req.vendorId);

        // Check if vendor exists
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // Create new firm
        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        await firm.save();

        console.log("✅ Firm added successfully");
        return res.status(200).json({ message: "Firm added successfully" });

    } catch (error) {
        console.error("💥 Error in addFirm:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Export controller function (without multer)
module.exports = { addFirm };
