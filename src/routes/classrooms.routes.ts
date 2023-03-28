import { NextFunction, Request, Response, Router } from "express";
import { newClassroom } from "../controllers/classrooms.controller";
import { UserTypeEnum } from "../helpers/types";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/classroom', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], newClassroom)
}