import { body, validationResult } from "express-validator";
export const validators = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const signupvalidators = [
    body("name").notEmpty().withMessage("Name is required !!"),
    body("email").trim().isEmail().withMessage("Email is required !!"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should have min 6 characters !! "),
];
//# sourceMappingURL=validators.js.map