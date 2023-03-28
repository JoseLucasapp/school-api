import mongoose, { Schema, model } from "mongoose";

interface Schedule_Hour {
    start: Date
    end: Date
    subject: string
}

export interface ScheduleInterface {
    day: string
    subjects: Schedule_Hour
    classroom_id: mongoose.Types.ObjectId
    school_id: mongoose.Types.ObjectId
}

const schema = new Schema(
    {
        day: {
            type: String,
            required: true,
        },
        schedule: {
            type: Object
        },
        school_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'schools'
        },
        classroom_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'classrooms'
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

const Model = model<ScheduleInterface>('schedules', schema)

export default Model