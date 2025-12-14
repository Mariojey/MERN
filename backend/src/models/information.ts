import { Schema, type InferSchemaType, model } from "mongoose";

const informationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
    }
    
}, {timestamps: true});

type TInformation = InferSchemaType<typeof informationSchema>;

export default model<TInformation>("Information", informationSchema);