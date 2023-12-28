import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validators = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
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
    }
};

export const loginvalidators = [
    body("email").notEmpty().trim().isEmail().withMessage("Email is required !!"),
    body("password").notEmpty().trim().isLength({ min: 6 }).withMessage("Password should have min 6 characters !! "),
];

export const signupvalidators = [
    body("name").notEmpty().withMessage("Name is required !!"),
    ...loginvalidators,
];