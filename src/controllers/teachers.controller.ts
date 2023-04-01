import { Request, Response } from "express";
import { createSchoolData, deleteSchoolData, getDataById, updateSchoolData } from "../helpers/utils";
import TeacherSchema from "../models/teachers.model";

export const addNewTeacher = async (req: Request, res: Response) => {
    try {
        createSchoolData(res, TeacherSchema, { ...req.body, school_id: req.params.userId })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getTeachers = async (req: Request, res: Response) => {
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
        if (queryData.subject) Object.assign(filter, { subjects: { $regex: queryData.subject, $options: 'i' } })

        const totalEntries = await TeacherSchema.find(filter).select('-password').count()
        const teachersData = await TeacherSchema
            .find(filter)
            .select('-password')
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

        const data = {
            data: teachersData,
            metadata: {
                pageNumber: pageOptions.page,
                pageSize: teachersData.length,
                totalEntries: totalEntries,
                totalPages: Math.ceil(totalEntries / pageOptions.limit),
            },
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getTeachersById = async (req: Request, res: Response) => getDataById(req, res, TeacherSchema)

export const updateTeacher = async (req: Request, res: Response) => updateSchoolData(req, res, TeacherSchema)

export const deleteTeacher = async (req: Request, res: Response) => deleteSchoolData(req, res, TeacherSchema)