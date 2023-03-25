import mongoose, { Schema, model } from "mongoose";

interface GradesObjectInterface {
    number: number
    grade: Float64Array
}

export interface GradesInterface {
    subject: string
    grades: GradesObjectInterface
    student_id: mongoose.Types.ObjectId
    school_id: mongoose.Types.ObjectId
}

const schema = new Schema(
    {
        subject: {
            type: String,
        },
        grades: {
            type: Object
        },
        student_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
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

const Model = model<GradesInterface>('grades', schema)

export default Model