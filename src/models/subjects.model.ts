import mongoose, { Schema, model } from "mongoose";

export interface SubjectInteface {
    name: string
    teachers: string[]//teacher's ids
    school_id: mongoose.Types.ObjectId
}

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        teachers: [String],
        school_id: {
            type: mongoose.Types.ObjectId,
            required: true,
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

const Model = model<SubjectInteface>('subjects', schema)

export default Model