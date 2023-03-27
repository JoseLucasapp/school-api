import { Request, Response } from "express"
import WorkerSchema from '../models/workers.model'

export const addWorker = async (req: Request, res: Response) => {
    try {
        const newWorker = new WorkerSchema(req.body)
        const worker = await newWorker.save()
        const data = await WorkerSchema.findOne({ _id: worker._id }).select('-password')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getWorkers = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            const worker = await WorkerSchema.findOne({ _id: req.params.id, school_id: req.params.userId }).select('-password')
            return res.status(200).json(worker)
        }

        const filter = {}
        const queryData = req.query

        const pageOptions = {
            page: parseInt(queryData.page as string) || 0,
            limit: parseInt(queryData.limit as string) || 10,
        }

        Object.assign(filter, { school_id: req.params.userId })
        if (queryData.name) Object.assign(filter, { name: { $regex: queryData.name, $options: 'i' } })
        if (queryData.role) Object.assign(filter, { role: { $regex: queryData.role, $options: 'i' } })
        if (queryData.email) Object.assign(filter, { email: { $regex: queryData.email, $options: 'i' } })

        const totalEntries = await WorkerSchema.find(filter).count()
        const workersData = await WorkerSchema
            .find(filter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

        const data = {
            data: workersData,
            metadata: {
                pageNumber: pageOptions.page,
                pageSize: workersData.length,
                totalEntries: totalEntries,
                totalPages: Math.ceil(totalEntries / pageOptions.limit),
            },
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}