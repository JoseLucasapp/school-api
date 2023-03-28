import { Request, Response } from "express";
import { createData } from "../helpers/utils";
import StudentSchema from "../models/students.model";

export const newStudent = async (req: Request, res: Response) => {
    try {
        createData(res, StudentSchema, { ...req.body, school_id: req.params.userId })
    } catch (error) {
        res.status(200).json(error)
    }
}