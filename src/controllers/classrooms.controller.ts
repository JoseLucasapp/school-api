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

export const getClassrooms = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            const classroom = await ClassroomSchema.findOne({ _id: req.params.id, school_id: req.params.userId })
            return res.status(200).json(classroom)
        }

        const filter = {}
        const queryData = req.query

        const pageOptions = {
            page: parseInt(queryData.page as string) || 0,
            limit: parseInt(queryData.limit as string) || 10,
        }

        Object.assign(filter, { school_id: req.params.userId })
        if (queryData.name) Object.assign(filter, { name: { $regex: queryData.name, $options: 'i' } })
        if (queryData.time) Object.assign(filter, { time: { $regex: queryData.role, $options: 'i' } })

        const totalEntries = await ClassroomSchema.find(filter).count()
        const classroomData = await ClassroomSchema
            .find(filter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

        const data = {
            data: classroomData,
            metadata: {
                pageNumber: pageOptions.page,
                pageSize: classroomData.length,
                totalEntries: totalEntries,
                totalPages: Math.ceil(totalEntries / pageOptions.limit),
            },
        }

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