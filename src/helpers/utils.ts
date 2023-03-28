import { createHash as cryptoCreateHash } from 'crypto'
import { Request, Response } from 'express';
import mongoose from 'mongoose';

const HASHCODE: string = (process.env.HASHCODE as string);

export const createHash = (value: string) => {
    return cryptoCreateHash(HASHCODE).update(value).digest('hex')
}

export const mTel = (tel: string) => {
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/(.{0})(\d)/, "$1($2")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    tel = tel.replace(/(.{4})(\d)/, "$1 $2")
    tel = tel.replace(/(.{6})(\d)/, "$1 $2")
    tel = tel.replace(/(.{12})(\d)/, "$1-$2")
    return tel;
}

export const createSchoolData = async (res: Response, Schema: any, body: any) => {
    const newData = new Schema(body)
    const dataFind = await newData.save()
    const data = await Schema.findOne({ _id: dataFind._id })
    return res.status(200).json(data)
}

export const deleteSchoolData = async (req: Request, res: Response, Schema: any) => {
    try {
        await Schema.deleteOne({ _id: req.params.id, school_id: req.params.userId })
        res.status(200).json({ message: "Dados apagados" })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const checkEmail = async (email: string, Schema: any) => {
    const emailData = await Schema.findOne({ email }).select(email)
    if (emailData) {
        return true
    }
    return false
}