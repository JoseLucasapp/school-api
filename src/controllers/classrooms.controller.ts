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