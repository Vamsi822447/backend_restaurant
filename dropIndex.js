// dropIndex.js
const mongoose = require('mongoose');
require('dotenv').config(); // load .env file

// Connect to your MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("✅ Connected to MongoDB");

        // Drop the unique index from the firms collection
        const result = await mongoose.connection.db.collection('firms').dropIndex('firmname_1');
        console.log("🧹 Index removed successfully:", result);

        mongoose.disconnect();
    })
    .catch(err => {
        console.error("❌ Error:", err.message);
    });
