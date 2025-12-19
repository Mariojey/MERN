import { model, Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema({

    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    email: {
        type: String,
        require: true,
        select: false,
        unique: true
    }
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);