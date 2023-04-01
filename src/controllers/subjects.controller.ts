import { Request, Response } from "express";
import { createSchoolData, deleteSchoolData, getDataById, updateSchoolData } from "../helpers/utils";
import SubjectSchema from '../models/subjects.model'

export const createNewSubject = async (req: Request, res: Response) => {
    try {
        createSchoolData(res, SubjectSchema, { ...req.body, school_id: req.params.userId })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSubjects = async (req: Request, res: Response) => {
    try {

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

export const getSubjectsById = async (req: Request, res: Response) => getDataById(req, res, SubjectSchema)

export const updateSubject = async (req: Request, res: Response) => updateSchoolData(req, res, SubjectSchema)

export const deleteSubject = async (req: Request, res: Response) => deleteSchoolData(req, res, SubjectSchema)