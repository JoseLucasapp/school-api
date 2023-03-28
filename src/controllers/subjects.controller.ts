import { Request, Response } from "express";
import SubjectSchema from '../models/subjects.model'

export const createNewSubject = async (req: Request, res: Response) => {
    try {
        const newSubject = new SubjectSchema({ ...req.body, school_id: req.params.userId })
        const subject = await newSubject.save()
        const data = await SubjectSchema.findOne({ _id: subject._id })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}