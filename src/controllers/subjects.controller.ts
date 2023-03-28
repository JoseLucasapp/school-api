import { Request, Response } from "express";
import { createData } from "../helpers/utils";
import SubjectSchema from '../models/subjects.model'

export const createNewSubject = async (req: Request, res: Response) => {
    try {
        createData(res, SubjectSchema, { ...req.body, school_id: req.params.userId })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSubjects = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            const subject = await SubjectSchema.findOne({ _id: req.params.id, school_id: req.params.userId })
            return res.status(200).json(subject)
        }

        const filter = {}
        const queryData = req.query

        const pageOptions = {
            page: parseInt(queryData.page as string) || 0,
            limit: parseInt(queryData.limit as string) || 10,
        }

        Object.assign(filter, { school_id: req.params.userId })
        if (queryData.name) Object.assign(filter, { name: { $regex: queryData.name, $options: 'i' } })

        const totalEntries = await SubjectSchema.find(filter).count()
        const subjectData = await SubjectSchema
            .find(filter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

        const data = {
            data: subjectData,
            metadata: {
                pageNumber: pageOptions.page,
                pageSize: subjectData.length,
                totalEntries: totalEntries,
                totalPages: Math.ceil(totalEntries / pageOptions.limit),
            },
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateSubject = async (req: Request, res: Response) => {
    try {
        await SubjectSchema.updateOne({ _id: req.params.id, school_id: req.params.userId }, { $set: req.body }, { upsert: true, new: true })
        res.status(200).json({ message: "Dados atualizados" })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteSubject = async (req: Request, res: Response) => {
    try {
        await SubjectSchema.deleteOne({ _id: req.params.id, school_id: req.params.userId })
        res.status(200).json({ message: "Dados apagados" })
    } catch (error) {
        res.status(500).json(error)
    }
}