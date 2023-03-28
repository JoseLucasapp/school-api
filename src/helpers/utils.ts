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

export const createData = async (res: Response, Schema: any, body: any) => {
    const newData = new Schema(body)
    const dataFind = await newData.save()
    const data = await Schema.findOne({ _id: dataFind._id })
    return res.status(200).json(data)
}

export const checkEmail = async (email: string, Schema: any) => {
    const emailData = await Schema.findOne({ email }).select(email)
    if (emailData) {
        return true
    }
    return false
}