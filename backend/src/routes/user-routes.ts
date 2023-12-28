import { Router } from "express";
import { getAllUsers, userLogin, userSignUp } from "../controllers/user-controllers.js";
import { loginvalidators, signupvalidators, validators } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup",validators(signupvalidators), userSignUp);
userRoutes.post("/login",validators(loginvalidators), userLogin);

export default userRoutes;