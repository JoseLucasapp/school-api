import { Request, Response } from "express"
import { checkEmail, createSchoolData } from "../helpers/utils"
import SchoolSchema from '../models/school.model'

export const registrySchool = async (req: Request, res: Response) => {
    try {
        const checkEmailData = await checkEmail(req.body.email, SchoolSchema)
        if (checkEmailData) return res.status(400).json({ mensagem: 'Email já cadastrado' })
        req.body.phone = parseInt(req.body.phone)
        createSchoolData(res, SchoolSchema, req.body)
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

        const totalEntries = await SchoolSchema.find(filter).count()
        const schoolData = await SchoolSchema
            .find(filter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

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
        await SchoolSchema.updateOne({ _id: req.params.id }, { $set: req.body }, { upsert: true, new: true })
        res.status(200).json({ message: "Dados atualizados" })
    } catch (error) {
        res.status(500).json(error)
    }
}
export const deleteSchool = async (req: Request, res: Response) => {
    try {
        await SchoolSchema.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: "Dados apagados" })
    } catch (error) {
        res.status(500).json(error)
    }
}