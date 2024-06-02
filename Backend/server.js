import express from 'express';
import dotenv from 'dotenv';
import customerRouter from './Routes/customer.js';
import sellerRouter from './Routes/seller.js';
import productRouter from './Routes/products.js';
import adminRouter from './Routes/admin.js';
import { getCustomers } from './models/admin.js';
import { createTemporaryCustomer } from './Models/customer.js';
import { getCustomerbyEmail, createPermanentCustomer, deleteTemporaryCustomer } from "./Models/customer.js";
dotenv.config();
const port = process.env.SERVER_PORT || 4001;
const app = express();
app.use(express.json());
app.use('/customer', customerRouter);
app.use('/seller', sellerRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');

});
app.post("/list", async (req, res) => {
    const { email } = req.body;
    await deleteTemporaryCustomer(email);
    res.send("Deletion done");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});