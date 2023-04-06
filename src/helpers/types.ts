import { Types } from "mongoose"

export enum UserTypeEnum {
    ADMIN = 'ADMIN',
    SCHOOL = 'SCHOOL',
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER'
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