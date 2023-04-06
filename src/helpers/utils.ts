import { createHash as cryptoCreateHash } from 'crypto'

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