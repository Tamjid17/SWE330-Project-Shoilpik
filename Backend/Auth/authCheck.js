import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    const secret =  process.env.ACCESS_TOKEN ;
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}