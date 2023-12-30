import jwt from 'jsonwebtoken';


export const createToken = (id: string, email: string, expireIn: string) => {


    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });


}