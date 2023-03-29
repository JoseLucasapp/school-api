import { NextFunction, Request, Response, Router } from "express";
import { deleteStudent, getStudents, newStudent, updateStudent } from "../controllers/students.controller";
import { UserTypeEnum } from "../helpers/types";
import { emailValidation, nameValidation, passwordValidation, phoneValidation } from "../middleware/simpleValidations";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/student',
        [
            (req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL]),
            (req: Request, res: Response, next: NextFunction) => emailValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => phoneValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => passwordValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => nameValidation(req, res, next),
        ],
        newStudent)

    router.get('/student/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [
        UserTypeEnum.ADMIN, UserTypeEnum.TEACHER, UserTypeEnum.ADMIN, UserTypeEnum.STUDENT
    ])], getStudents)

    router.put('/student/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN])], updateStudent)
    router.delete('/student/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN])], deleteStudent)
}