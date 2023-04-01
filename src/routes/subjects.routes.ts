import { NextFunction, Request, Response, Router } from "express";
import { createNewSubject, deleteSubject, getSubjects, getSubjectsById, updateSubject } from "../controllers/subjects.controller";
import { UserTypeEnum } from "../helpers/types";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.get('/subjects', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL, UserTypeEnum.STUDENT, UserTypeEnum.TEACHER, UserTypeEnum.ADMIN])], getSubjects)
    router.get('/subjects/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL, UserTypeEnum.STUDENT, UserTypeEnum.TEACHER, UserTypeEnum.ADMIN])], getSubjectsById)
    router.post('/subjects', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], createNewSubject)
    router.put('/subjects/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], updateSubject)
    router.delete('/subjects/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], deleteSubject)
}