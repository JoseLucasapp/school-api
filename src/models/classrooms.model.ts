import mongoose, { Schema, model } from "mongoose";

enum Time {
    NOITE = "NIGHT",
    TARDE = "AFTERNOON",
    MANHA = "MORNING",
    ALLDAY = "ALLDAY",
}

export interface ClassroomInterface {
    name: string
    time: Time
    school_id: mongoose.Types.ObjectId
}

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            enum: ["NIGHT", "AFTERNOON", "MORNING", "ALLDAY"],
            required: true
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

const Model = model<ClassroomInterface>('classrooms', schema)

export default Model