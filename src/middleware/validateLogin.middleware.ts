import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jwt";
import { UserTypeEnum } from "../helpers/types";

export const validadeJwt = (req: Request, res: Response, next: NextFunction, UserTypeEnum: UserTypeEnum[]) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({
            error: {
                message: 'Token não informado',
            },
        })
    }
    const user = verifyToken(authorization)
    if (!user) {
        return res.status(401).json({
            error: {
                message: 'Token inválido',
            },
        })
    }
    if (!UserTypeEnum.includes(user.role)) {
        return res.status(401).json({
            error: {
                message: 'Acesso negado',
            },
        })
    }
    req.params.userId = String(user.id)
    req.params.userRole = String(user.role)
    next()
}