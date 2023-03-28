import { NextFunction, Request, Response, Router } from "express";
import { newStudent } from "../controllers/students.controller";
import { UserTypeEnum } from "../helpers/types";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/student', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN])], newStudent)
}