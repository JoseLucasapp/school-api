import { NextFunction, Request, Response, Router } from "express";
import { addNewTeacher, deleteTeacher, getTeachers, updateTeacher } from "../controllers/teachers.controller";
import { UserTypeEnum } from "../helpers/types";
import { emailValidation, nameValidation, passwordValidation, phoneValidation } from "../middleware/simpleValidations";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/teacher',
        [
            (req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL]),
            (req: Request, res: Response, next: NextFunction) => emailValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => phoneValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => passwordValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => nameValidation(req, res, next),
        ],
        addNewTeacher)

    router.get('/teacher/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [
        UserTypeEnum.ADMIN, UserTypeEnum.TEACHER, UserTypeEnum.ADMIN, UserTypeEnum.STUDENT
    ])], getTeachers)

    router.put('/teacher/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], updateTeacher)
    router.delete('/teacher/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], deleteTeacher)
}