import { Request, Response } from "express";
import ClassroomSchema from '../models/classrooms.model'
import { create, getById, getData, getDataAndCount, remove, update } from "../services/db";
import { Messages } from "../helpers/types";

export const newClassroom = async (req: Request, res: Response) => {
    try {
        const data = await create({ ...req.body, school_id: req.params.userId }, ClassroomSchema)
        const response = await getById(data._id, ClassroomSchema, req.params.userId)
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getClassrooms = async (req: Request, res: Response) => {
    try {

        const filter = {}
        const queryData = req.query

        const pageOptions = {
            page: parseInt(queryData.page as string) || 0,
            limit: parseInt(queryData.limit as string) || 10,
        }

        Object.assign(filter, { school_id: req.params.userId })
        if (queryData.name) Object.assign(filter, { name: { $regex: queryData.name, $options: 'i' } })
        if (queryData.time) Object.assign(filter, { time: { $regex: queryData.role, $options: 'i' } })

        const totalEntries = await getDataAndCount(filter, ClassroomSchema)
        if (totalEntries <= 0) return res.status(204).json({ data: [] })
        const classroomData = await getData(filter, pageOptions, ClassroomSchema)

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

export const getClassroomById = async (req: Request, res: Response) => {
    try {
        const data = await getById(req.params.id, ClassroomSchema, req.params.userId)
        if (!data) return res.status(404).json(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateClassroom = async (req: Request, res: Response) => {
    try {
        await update(req.params.id, ClassroomSchema, req.body, req.params.userId)
        res.status(200).json({ message: Messages.update })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteClassroom = async (req: Request, res: Response) => {
    try {
        await remove(req.params.id, ClassroomSchema, req.params.userId)
        res.status(200).json({ message: Messages.delete })
    } catch (error) {
        res.status(500).json(error)
    }
}