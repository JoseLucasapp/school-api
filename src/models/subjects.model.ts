import mongoose, { Schema, model } from "mongoose";

export interface SubjectInteface {
    name: string
    teacher: mongoose.Types.ObjectId[]
    school_id: mongoose.Types.ObjectId
}

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        teachers: {
            type: [mongoose.Types.ObjectId],
            required: true,
        },
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

const Model = model<SubjectInteface>('subjects', schema)

export default Model