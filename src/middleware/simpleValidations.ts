import { NextFunction, Request, Response } from "express"

export const emailValidation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) return res.status(400).json({ mensagem: 'Email não informado' })
    next()
}

export const phoneValidation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.phone) return res.status(400).json({ mensagem: 'Telefone não informado' })
    next()
}

export const nameValidation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name) return res.status(400).json({ mensagem: 'Nome não informado' })
    next()
}

export const passwordValidation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.password) return res.status(400).json({ mensagem: 'Senha não informada' })
    next()
}