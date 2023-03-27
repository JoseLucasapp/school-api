import { Request, Response } from "express"
import SchoolSchema from '../models/school.model'

export const registrySchool = async (req: Request, res: Response) => {
    try {
        const newSchool = await SchoolSchema.create(req.body)
        const { password, ...data } = newSchool
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSchools = (req: Request, res: Response) => { }
export const updateSchool = (req: Request, res: Response) => { }
export const deleteSchool = (req: Request, res: Response) => { }