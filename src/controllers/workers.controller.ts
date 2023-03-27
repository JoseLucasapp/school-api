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