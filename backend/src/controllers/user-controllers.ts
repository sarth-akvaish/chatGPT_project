import { Request, Response, NextFunction } from "express";
import User from "../models/User.js"
import { hash, compare } from 'bcrypt'
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";


// For getting all users from the database
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    // get all users from the database
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.messae });
    }
}

export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {

    // Creating a new user from Signing Up

    try {

        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("User already registered !!");
        }
        const hashPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashPassword });
        await user.save();


        res.clearCookie(COOKIE_NAME,
            {
                httpOnly: true,
                domain: "localhost",
                signed: true,
                path: "/"
            }
        );

        const token = createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });


        return res.status(201).json({ message: "Signup Successfull", name: user.name, email: user.email });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "ERROR", cause: error.messae });
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {

    // Creating a new user from Signing Up

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
            return res.status(401).send("User not registered !!");

        const isPassword = await compare(password, user.password);

        if (!isPassword)
            return res.status(403).send("Incorrect Password");

        res.clearCookie(COOKIE_NAME,
            {
                httpOnly: true,
                domain: "localhost",
                signed: true,
                path: "/",
            }
        );

        const token = createToken(user._id.toString(), user.email, "7d");

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true
        });

        return res.status(200).json({ message: "OK", name: user.name, email: user.email });


    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "ERROR", cause: error.messae });
    }
}