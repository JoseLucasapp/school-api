import { NextFunction, Request, Response, Router } from "express";
import { addGrade, deleteGrade, getGrades, updateGrade } from "../controllers/grades.controller";
import { UserTypeEnum } from "../helpers/types";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/grade',
        [
            (req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL, UserTypeEnum.TEACHER]),
        ],
        addGrade)

    router.get('/grade/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [
        UserTypeEnum.ADMIN, UserTypeEnum.TEACHER, UserTypeEnum.ADMIN, UserTypeEnum.STUDENT
    ])], getGrades)

    router.put('/grade/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL, UserTypeEnum.TEACHER])], updateGrade)
    router.delete('/grade/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL, UserTypeEnum.TEACHER])], deleteGrade)
}