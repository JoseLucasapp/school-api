import { Request, Response } from "express";
import { createSchoolData, deleteSchoolData, getDataById, updateSchoolData } from "../helpers/utils";
import GradeSchema from "../models/grades.model";

export const addGrade = async (req: Request, res: Response) => {
    try {
        createSchoolData(res, GradeSchema, { ...req.body, school_id: req.params.userId })
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

        const totalEntries = await GradeSchema.find(filter).count()
        const gradesData = await GradeSchema
            .find(filter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

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

export const getGradeById = async (req: Request, res: Response) => getDataById(req, res, GradeSchema)

export const updateGrade = async (req: Request, res: Response) => updateSchoolData(req, res, GradeSchema)

export const deleteGrade = async (req: Request, res: Response) => deleteSchoolData(req, res, GradeSchema)