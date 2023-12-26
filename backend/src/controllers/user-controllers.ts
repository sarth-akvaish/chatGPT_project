import { Request, Response, NextFunction } from "express";
import User from "../models/User.js"
import { hash } from 'bcrypt'
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {


    // get all users from the database


    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "ERROR", cause: error.messae });
    }
}

export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {

    // Creating a new user from Signing Up

    try {
        const { name, email, password } = req.body;
        const hashPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        return res.status(200).json({ message: "Signup Successfull", id: user._id.toString() });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "ERROR", cause: error.messae });
    }
}