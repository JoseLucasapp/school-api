import { NextFunction, Request, Response, Router } from "express";
import { addWorker, deleteWorker, getWorkers, updateWorker } from "../controllers/workers.controller";
import { UserTypeEnum } from "../helpers/types";
import { validadeJwt } from "../middleware/validateLogin.middleware";

export default (router: Router) => {
    router.post('/worker', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], addWorker)
    router.get('/worker/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL, UserTypeEnum.STUDENT, UserTypeEnum.TEACHER, UserTypeEnum.ADMIN])], getWorkers)
    router.put('/worker/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], updateWorker)
    router.delete('/worker/:id', [(req: Request, res: Response, next: NextFunction) => validadeJwt(req, res, next, [UserTypeEnum.SCHOOL])], deleteWorker)
}