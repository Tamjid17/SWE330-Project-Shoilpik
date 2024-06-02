import { getCustomers } from '../models/admin.js';

export const customerList = async (req, res) => {
    try {
        const customers = await getCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}