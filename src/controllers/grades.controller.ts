import { Request, Response } from "express";
import GradeSchema from "../models/grades.model";
import { create, getById, getData, getDataAndCount, remove, update } from "../services/db";
import { Messages } from "../helpers/types";

export const addGrade = async (req: Request, res: Response) => {
    try {
        const data = await create({ ...req.body, school_id: req.params.userId }, GradeSchema)
        const response = await getById(data._id, GradeSchema, req.params.userId)
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getGrades = async (req: Request, res: Response) => {
    try {
        const filter = {}
        const queryData = req.query

        const pageOptions = {
            page: parseInt(queryData.page as string) || 0,
            limit: parseInt(queryData.limit as string) || 10,
        }

        Object.assign(filter, { school_id: req.params.userId })
        if (queryData.student_id) Object.assign(filter, { student_id: { $regex: queryData.student_id, $options: 'i' } })
        if (queryData.subject) Object.assign(filter, { subject: { $regex: queryData.subject, $options: 'i' } })

        const totalEntries = await getDataAndCount(filter, GradeSchema)
        if (totalEntries <= 0) return res.status(204).json({ data: [] })
        const gradesData = await getData(filter, pageOptions, GradeSchema)

        const data = {
            data: gradesData,
            metadata: {
                pageNumber: pageOptions.page,
                pageSize: gradesData.length,
                totalEntries: totalEntries,
                totalPages: Math.ceil(totalEntries / pageOptions.limit),
            },
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getGradeById = async (req: Request, res: Response) => {
    try {
        const data = await getById(req.params.id, GradeSchema, req.params.userId)
        if (!data) return res.status(404).json(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateGrade = async (req: Request, res: Response) => {
    try {
        await update(req.params.id, GradeSchema, req.body, req.params.userId)
        res.status(200).json({ message: Messages.update })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteGrade = async (req: Request, res: Response) => {
    try {
        await remove(req.params.id, GradeSchema, req.params.userId)
        res.status(200).json({ message: Messages.delete })
    } catch (error) {
        res.status(500).json(error)
    }
}