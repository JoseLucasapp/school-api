import { NextFunction, Request, Response, Router } from "express";
import { deleteSchool, getSchools, registrySchool, updateSchool } from "../controllers/school.controller";
import { UserTypeEnum } from "../helpers/types";
import { emailValidation, nameValidation, passwordValidation, phoneValidation } from "../middleware/simpleValidations";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/school',
        [
            (req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN]),
            (req: Request, res: Response, next: NextFunction) => emailValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => phoneValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => passwordValidation(req, res, next),
            (req: Request, res: Response, next: NextFunction) => nameValidation(req, res, next),
        ], registrySchool)

    router.get('/school/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN, UserTypeEnum.SCHOOL, UserTypeEnum.TEACHER, UserTypeEnum.STUDENT])], getSchools)
    router.put('/school/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN])], updateSchool)
    router.delete('/school/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.ADMIN])], deleteSchool)
}