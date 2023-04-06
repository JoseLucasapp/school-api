import { Request, Response } from "express"
import SchoolSchema from '../models/school.model'
import { checkEmail, create, getById, getData, getDataAndCount, remove, update } from "../services/db"
import { Messages } from "../helpers/types"

export const registrySchool = async (req: Request, res: Response) => {
    try {
        const checkEmailData = await checkEmail(req.body.email, SchoolSchema)
        if (checkEmailData) return res.status(400).json({ mensagem: Messages.emailAlreadyUsed })

        req.body.phone = parseInt(req.body.phone)

        const data = await create(req.body, SchoolSchema)
        const response = await getById(data._id, SchoolSchema)
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSchools = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            const data = await SchoolSchema.findOne({ _id: req.params.id })
            return res.status(200).json(data)
        }
        const filter = {}
        const queryData = req.query

        const pageOptions = {
            page: parseInt(queryData.page as string) || 0,
            limit: parseInt(queryData.limit as string) || 10,
        }

        if (queryData.name) Object.assign(filter, { name: { $regex: queryData.name, $options: 'i' } })

        const totalEntries = await getDataAndCount(filter, SchoolSchema)
        if (totalEntries <= 0) return res.status(204).json({ data: [] })
        const schoolData = await getData(filter, pageOptions, SchoolSchema)

        const data = {
            data: schoolData,
            metadata: {
                pageNumber: pageOptions.page,
                pageSize: schoolData.length,
                totalEntries: totalEntries,
                totalPages: Math.ceil(totalEntries / pageOptions.limit),
            },
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const updateSchool = async (req: Request, res: Response) => {
    try {
        await update(req.params.id, SchoolSchema, req.body)
        res.status(200).json({ message: Messages.update })
    } catch (error) {
        res.status(500).json(error)
    }
}
export const deleteSchool = async (req: Request, res: Response) => {
    try {
        await remove(req.params._id, SchoolSchema)
        res.status(200).json({ message: Messages.delete })
    } catch (error) {
        res.status(500).json(error)
    }
}