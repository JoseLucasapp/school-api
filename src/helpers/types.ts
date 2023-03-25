import { Types } from "mongoose"

export enum UserTypeEnum {
    ADMIN = 'ADMIN',
    SCHOOL = 'ESCOLA',
    STUDENT = 'ESTUDANTE',
    TEACHER = 'PROFESSOR'
}

export interface AuthInterface {
    id: Types.ObjectId
    email: string
    name: string
    role: UserTypeEnum
}