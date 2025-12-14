import type { RequestHandler } from "express";
import InformationModel from "../models/information.ts";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface IPostInformationBody {
    title?: string,
    content?: string,
}

interface IPatchInformationBody {
    title?: string,
    content?: string,
}

interface IPatchInformationParams {
    infId: string,
}

export const getInformations: RequestHandler =  async (req, res, next) => {

    try{
        const information = await InformationModel.find().exec();
        res.status(200).json(information);
    
    }catch(error){

        next(error);
    
    }
}

export const getInformation: RequestHandler = async(req, res, next) => {

    const infoId = req.params.infId;

    try{

        if(!mongoose.isValidObjectId(infoId)){
            throw createHttpError(400, "Incorrect id");
        }

        const information = await InformationModel.findById(infoId).exec();

        if(!information){
            throw createHttpError(404, "Not Found");
        }

        res.status(200).json(information);
    }catch(error){
        next(error);
    }
};

export const createInformation: RequestHandler<unknown, unknown, IPostInformationBody, unknown> = async (req, res, next) => {

    const title = req.body.title;
    const content = req.body.content;

    try{

        if (!title) {
            throw createHttpError(400, "Title missing");
        }

        const newInformation = await InformationModel.create({
            title: title,
            content: content
        });

        res.status(201).json(newInformation);
    }catch(error){
        next(error);
    }
}



export const updateInformation: RequestHandler<IPatchInformationParams, unknown, IPatchInformationBody, unknown> = async(req, res, next) => {

    const infoId = req.params.infId;
    const followingTitle = req.body.title;
    const followingContent = req.body.content;


    try{
        if(!mongoose.isValidObjectId(infoId)){
            throw createHttpError(400, "Incorrect id");
        }

        if(!followingTitle){
            throw createHttpError(400, "Title is obligatory");
        }

        const information = await InformationModel.findById(infoId).exec();

        if (!information) {
            throw createHttpError(404, "Information not found");
        }

        information.title = followingTitle;
        information.content = followingContent;

        const updatedInformation = await information.save();

        res.status(200).json(updateInformation);
    }catch(error){
        next(error);
    }
}

export const deleteInformation: RequestHandler = async(req, res, next) => {
    
    const infoId = req.params.infId;

    try{
        
        if (!mongoose.isValidObjectId(infoId)){
            throw createHttpError(400, "Incorrect id");
        }

        const information = await InformationModel.findById(infoId).exec();

        if(!information){
            throw createHttpError(404, "Record not found");
        }

        await information.deleteOne();

        res.sendStatus(204);

    }catch(error){
        next(error);
    }
}