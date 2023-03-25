import mongoose, { Schema, model } from "mongoose";

enum Roles {
    DIRECTOR = "DIRETOR",
    CONCIERGE = "PORTEIRO",
    JANITOR = "FAXINEIRO",
    GENERAL = "SERVICOS_GERAIS"
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
            enum: ["DIRETOR",
                "PORTEIRO",
                "FAXINEIRO",
                "SERVICOS_GERAIS"],
            required: true
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

const Model = model<WorkersInterface>('workers', schema)

export default Model