import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createToken = (payload, expiresIn) => {
    const secret = process.env.ACCESS_TOKEN || '946fb70744dedab63210d32b09ff901a';
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
}

export default createToken;
