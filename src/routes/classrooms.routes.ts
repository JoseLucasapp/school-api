import { NextFunction, Request, Response, Router } from "express";
import { deleteClassroom, getClassrooms, newClassroom, updateClassroom } from "../controllers/classrooms.controller";
import { UserTypeEnum } from "../helpers/types";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/classroom', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], newClassroom)
    router.get('/classroom/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], getClassrooms)
    router.put('/classroom/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], updateClassroom)
    router.delete('/classroom/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], deleteClassroom)
}