import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const createToken = (user, expiresIn) => {
    const { email } = user;
    return jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: expiresIn });
}

export default createToken;