import mongoose, { Schema, model } from "mongoose";

enum Roles {
    PRINCIPAL = "PRINCIPAL",
    CONCIERGE = "CONCIERGE",
    JANITOR = "JANITOR",
    GENERALSERVICES = "GENERALSERVICES"
}

export interface WorkersInterface {
    name: string
    email: string
    phone: number
    role: Roles
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
        phone: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            enum: ["PRINCIPAL",
                "CONCIERGE",
                "JANITOR",
                "GENERALSERVICES"],
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

const Model = model<WorkersInterface>('workers', schema)

export default Model