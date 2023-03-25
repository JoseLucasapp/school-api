import mongoose, { Schema, model } from "mongoose";

enum Time {
    NOITE,
    TARDE,
    MANHA,
    INTEGRAL,
}

interface Schedule_Hour {
    start: Date
    end: Date
    subject: string
}

interface Schedule {
    day: string
    subjects: Schedule_Hour
}

export interface ClassroomInterface {
    name: string
    time: Time
    school_id: mongoose.Types.ObjectId
    schedule: Schedule
}

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            enum: ["NOITE",
                "TARDE",
                "MANHA",
                "INTEGRAL"],
            required: true
        },
        schedule: {
            type: Object
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

const Model = model<ClassroomInterface>('classrooms', schema)

export default Model