import jwt from 'jsonwebtoken';
export const createToken = (id, email, expireIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};
//# sourceMappingURL=token-manager.js.map