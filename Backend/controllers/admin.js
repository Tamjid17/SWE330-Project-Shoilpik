import createToken from '../Auth/createJWT.js';
import { getCustomers, adminRegister } from '../models/admin.js';

export const customerList = async (req, res) => {
    try {
        const customers = await getCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const adminRegisterControllers = async(req,res) => {
    try{
        const {name, email, password, role} = req.body;
        const {insertId: id} = await adminRegister(name, email, password, role);
        const payload = {id, name, email, role};
        const token = createToken(payload, '1d');
        return res.status(200).json({id: id, name, email, role, token});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}