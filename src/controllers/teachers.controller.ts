import { Request, Response } from "express";
import TeacherSchema from "../models/teachers.model";
import { create, getById, getData, getDataAndCount, remove, update } from "../services/db";
import { Messages } from "../helpers/types";

export const addNewTeacher = async (req: Request, res: Response) => {
    try {
        const data = await create({ ...req.body, school_id: req.params.userId }, TeacherSchema)
        const response = await getById(data._id, TeacherSchema, req.params.userId)
        res.status(201).json(response)
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

        const totalEntries = await getDataAndCount(filter, TeacherSchema)
        if (totalEntries <= 0) return res.status(204).json({ data: [] })
        const teachersData = await getData(filter, pageOptions, TeacherSchema)

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

export const getTeachersById = async (req: Request, res: Response) => {
    try {
        const data = await getById(req.params.id, TeacherSchema, req.params.userId)
        if (!data) return res.status(404).json(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        await update(req.params.id, TeacherSchema, req.body, req.params.userId)
        res.status(200).json({ message: Messages.update })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteTeacher = async (req: Request, res: Response) => {
    try {
        await remove(req.params.id, TeacherSchema, req.params.userId)
        res.status(200).json({ message: Messages.delete })
    } catch (error) {
        res.status(500).json(error)
    }
}