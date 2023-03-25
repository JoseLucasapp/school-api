import { Schema, model } from "mongoose";
import { createHash } from "../helpers/utils";

export interface AdminInterface {
    name: string
    email: string
    password: string
}

const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            set: createHash,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.__v
                return ret
            },
        },
    },
)

const Model = model<AdminInterface>('admin', schema)

export default Model