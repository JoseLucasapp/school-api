import { Request, Response } from "express";
import { createSchoolData, deleteSchoolData, getDataById, updateSchoolData } from "../helpers/utils";
import StudentSchema from "../models/students.model";

export const newStudent = async (req: Request, res: Response) => {
    try {
        createSchoolData(res, StudentSchema, { ...req.body, school_id: req.params.userId })
    } catch (error) {
        res.status(200).json(error)
    }
}

export const getStudents = async (req: Request, res: Response) => {
    try {
        const filter = {}
        const queryData = req.query

        const pageOptions = {
            page: parseInt(queryData.page as string) || 0,
            limit: parseInt(queryData.limit as string) || 10,
        }

        Object.assign(filter, { school_id: req.params.userId })
        if (queryData.name) Object.assign(filter, { name: { $regex: queryData.name, $options: 'i' } })
        if (queryData.email) Object.assign(filter, { email: { $regex: queryData.email, $options: 'i' } })

        const totalEntries = await StudentSchema.find(filter).select('-password').count()
        const studentsData = await StudentSchema
            .find(filter)
            .select('-password')
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

        const data = {
            data: studentsData,
            metadata: {
                pageNumber: pageOptions.page,
                pageSize: studentsData.length,
                totalEntries: totalEntries,
                totalPages: Math.ceil(totalEntries / pageOptions.limit),
            },
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getStudentsById = async (req: Request, res: Response) => getDataById(req, res, StudentSchema)

export const updateStudent = async (req: Request, res: Response) => updateSchoolData(req, res, StudentSchema)
export const deleteStudent = async (req: Request, res: Response) => deleteSchoolData(req, res, StudentSchema)