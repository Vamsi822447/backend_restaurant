const express = require("express");

const mongoose = require('mongoose')

const app = express();

const dotEnv = require('dotenv');

const PORT = process.env.PORT || 4000;

const vendorRoutes = require('./routes/vendorRoutes')

const firmRoutes = require('./routes/firmRoutes')

const productRoutes = require('./routes/productRoutes')

const bodyParser = require('body-parser');

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongoDB cnnected successfully"))
    .catch((error) => console.log(error))


app.use(express.json());

app.use(bodyParser.json());
app.use('/Vendor', vendorRoutes);
app.use('/Firm', firmRoutes)
app.use('/Product', productRoutes)
app.use('/uploads', express.static('uploads'));





app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
})

