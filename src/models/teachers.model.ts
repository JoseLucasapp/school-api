import mongoose, { Schema, model } from "mongoose";
import { createHash } from "../helpers/utils";

export interface TeacherInterface {
    name: string
    email: string
    password: string
    phone: number
    subject: string[]
    school_id: mongoose.Types.ObjectId
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
        subject: [String],
        school_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'schools'
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

const Model = model<TeacherInterface>('teachers', schema)

export default Model