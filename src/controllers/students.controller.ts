import { Request, Response } from "express";
import { createSchoolData } from "../helpers/utils";
import StudentSchema from "../models/students.model";

export const newStudent = async (req: Request, res: Response) => {
    try {
        createSchoolData(res, StudentSchema, { ...req.body, school_id: req.params.userId })
    } catch (error) {
        res.status(200).json(error)
    }
}