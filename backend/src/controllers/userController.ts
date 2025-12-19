import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user.ts";
import bcrypt from "bcrypt"

interface ISignUp {
    username?: string,
    email?: string,
    password?: string
}

interface ILogin {
    username?: string,
    password?: string
}

export const getAUthenticatedUser: RequestHandler = async (req, res, next) => {
    try{
        if(!req.session.userId){
            throw createHttpError(401, "User not authenticated");
        }

        const user = await UserModel.findById(req.session.userId).select("+email").exec();

        if(!user){
            throw createHttpError(404, "User not found");
        }

        res.status(200).json(user);
    }catch(error){
        next(error);
    }
};

export const signUp: RequestHandler<unknown, unknown, ISignUp, unknown> = async (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const plainPassword = req.body.password;

    try{
        
        if(!username || !email || !plainPassword){
            throw createHttpError(400, "Bad Request");
        }

        const usernameInUse = await UserModel.findOne({ username: username }).exec();

        if(usernameInUse){
            throw createHttpError(409, "Username already exists.");
        }

        const emailInUse = await UserModel.findOne({ email: email }).exec();

        if(emailInUse){
            throw createHttpError(410, "Email already exists in database.");
        }

        const encodedPassword = await bcrypt.hash(plainPassword, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: encodedPassword,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);

    }catch(error){
        next(error);
    }
}

export const login: RequestHandler<unknown, unknown, ILogin, unknown> = async (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    try{
        if (!username || !password){
            throw createHttpError(400, "Credentials missing");
        }

        const user = await UserModel.findOne({ username: username }).select("+password").exec();

        if(!user){
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id;

        res.status(201).json(user);

    }catch(error){
        next(error);
    }

};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if(error){
            next(error);
        }else{
            res.status(200).json({ message: "Logged out successfully" });
        }
    });
};             