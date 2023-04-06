import { Request, Response } from "express"
import WorkerSchema from '../models/workers.model'
import { create, getById, getData, getDataAndCount, remove, update } from "../services/db"
import { Messages } from "../helpers/types"

export const addWorker = async (req: Request, res: Response) => {
    try {
        const data = await create({ ...req.body, school_id: req.params.userId }, WorkerSchema)
        const response = await getById(data._id, WorkerSchema, req.params.userId)
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getWorkers = async (req: Request, res: Response) => {
    try {
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

        const totalEntries = await getDataAndCount(filter, WorkerSchema)
        if (totalEntries <= 0) return res.status(204).json({ data: [] })
        const workersData = await getData(filter, pageOptions, WorkerSchema)

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

export const getWorkersById = async (req: Request, res: Response) => {
    try {
        const data = await getById(req.params.id, WorkerSchema, req.params.userId)
        if (!data) return res.status(404).json(data)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateWorker = async (req: Request, res: Response) => {
    try {
        await update(req.params.id, WorkerSchema, req.body, req.params.userId)
        res.status(200).json({ message: Messages.update })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteWorker = async (req: Request, res: Response) => {
    try {
        await remove(req.params.id, WorkerSchema, req.params.userId)
        res.status(200).json({ message: Messages.delete })
    } catch (error) {
        res.status(500).json(error)
    }
}