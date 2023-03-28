import { Request, Response } from "express";
import ClassroomSchema from '../models/classrooms.model'

export const newClassroom = async (req: Request, res: Response) => {
    try {
        const newClassroomData = new ClassroomSchema({ ...req.body, school_id: req.params.userId })
        const classroom = await newClassroomData.save()
        const data = await ClassroomSchema.findOne({ _id: classroom._id })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateClassroom = async (req: Request, res: Response) => {
    try {
        await ClassroomSchema.updateOne({ _id: req.params.id, school_id: req.params.userId }, { $set: req.body }, { upsert: true, new: true })
        res.status(200).json({ message: "Dados atualizados" })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteClassroom = async (req: Request, res: Response) => {
    try {
        await ClassroomSchema.deleteOne({ _id: req.params.id, school_id: req.params.userId })
        res.status(200).json({ message: "Dados apagados" })
    } catch (error) {
        res.status(500).json(error)
    }
}