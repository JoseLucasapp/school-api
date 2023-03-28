import { NextFunction, Request, Response, Router } from "express";
import { createNewSubject } from "../controllers/subjects.controller";
import { UserTypeEnum } from "../helpers/types";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.get('/subjects', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], createNewSubject)
}