import { Request, Response } from "express";
import { generateToken } from "../helpers/jwt";
import { Messages, UserTypeEnum } from "../helpers/types";

import SchoolModel from '../models/school.model'
import TeacherModel from "../models/teachers.model";
import StudentModel from "../models/students.model";
import AdminModel from "../models/admin.model";
import { checkEmail, randomCheck } from "../services/db";

export const Login = async (req: Request, res: Response) => {
    try {
        const getData = async (user: any, database: any, UserTypeEnum: UserTypeEnum) => {
            if (!user) {
                //const userPass = await database.findOne({ email: user.email })
                const userPass = await checkEmail(user.email, database)
                if (userPass) {
                    return res.status(400).json({ message: Messages.wPass })
                }
                return res.status(404).json({ message: Messages.uNotFound })
            }
            const token = await generateToken({
                id: user._id,
                email: user.email,
                role: UserTypeEnum,
                name: user.name
            })

            return res.status(200).json({ user, token })
        }

        const { email, password, type } = req.body

        const getDataByType = async (model: any, type: UserTypeEnum) => {
            //const user = await model.findOne({ email, password }).select('-password')
            const user = await randomCheck({ email, password }, '-password', model)
            if (user) {
                return await getData(user, model, type)
            }
        }

        switch (type) {
            case "TEACHER":
                await getDataByType(TeacherModel, UserTypeEnum.TEACHER)
            case "SCHOOL":
                await getDataByType(SchoolModel, UserTypeEnum.SCHOOL)
            case "STUDENT":
                await getDataByType(StudentModel, UserTypeEnum.STUDENT)
            case "ADMIN":
                await getDataByType(AdminModel, UserTypeEnum.ADMIN)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}