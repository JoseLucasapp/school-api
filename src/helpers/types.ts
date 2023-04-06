import { Types } from "mongoose"

export enum UserTypeEnum {
    ADMIN = 'ADMIN',
    SCHOOL = 'ESCOLA',
    STUDENT = 'ESTUDANTE',
    TEACHER = 'PROFESSOR'
}

export enum Messages {
    update = 'Updated',
    delete = 'Deleted',
    emailAlreadyUsed = 'Email Already Used',
    wPass = 'Wrong password',
    uNotFound = 'User not found'
}

export interface AuthInterface {
    id: Types.ObjectId
    email: string
    name: string
    role: UserTypeEnum
}