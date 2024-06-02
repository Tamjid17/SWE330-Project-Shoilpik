import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const createToken = (user, expiresIn) => {
    const { name, gender, email, password, phone, address, dob } = user;
    return jwt.sign({ name,
            gender,
            email,
            password,
            phone,
            address,
            dob, }, process.env.ACCESS_TOKEN, { expiresIn: expiresIn });
}

export default createToken;