import { NextFunction, Request, Response, Router } from "express";
import { deleteSchool, getSchools, registrySchool, updateSchool } from "../controllers/school.controller";
import { UserTypeEnum } from "../helpers/types";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/school', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN])], registrySchool)
    router.get('/school/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN, UserTypeEnum.SCHOOL, UserTypeEnum.TEACHER, UserTypeEnum.STUDENT])], getSchools)
    router.put('/school/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN])], updateSchool)
    router.delete('/school/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN])], deleteSchool)
}