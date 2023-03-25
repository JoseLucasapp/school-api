import { Schema, model } from "mongoose";
import { createHash } from "../helpers/utils";

export interface SchoolInterface {
    name: string
    email: string
    password: string
    phone: number
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
        phone: {
            type: Number,
            required: true
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

const Model = model<SchoolInterface>('schools', schema)

export default Model