import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import customerRouter from './Routes/customer.js';
import sellerRouter from './Routes/seller.js';
import productRouter from './Routes/products.js';
import adminRouter from './Routes/admin.js';
import categoryRouter from './Routes/category.js';
import { getCustomers } from './models/admin.js';
import { createTemporaryCustomer } from './models/customer.js';
import { getCustomerbyEmail, createPermanentCustomer, deleteTemporaryCustomer } from "./models/customer.js";

dotenv.config();

const port = process.env.SERVER_PORT || 4001;
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/customer', customerRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/admin', adminRouter);
app.use('/api/category', categoryRouter);

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
