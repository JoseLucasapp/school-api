import { Types } from "mongoose"

export const create = async (body: any, Schema: any) => {
    const newData = new Schema(body)
    return await newData.save()
}

export const getById = async (id: Types.ObjectId, userId: Types.ObjectId, Schema: any) => {
    return await Schema.findOne({ _id: id, school_id: userId })
}

export const getData = async (filter: any, pageOptions: any, Schema: any) => {
    return await Schema
        .find(filter)
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
}

export const getDataAndCount = async (filter: any, Schema: any) => {
    return await Schema
        .find(filter)
        .count()
}

export const remove = async (id: Types.ObjectId, userId: Types.ObjectId, Schema: any) => {
    return await Schema.deleteOne({ _id: id, school_id: userId })
}

export const update = async (id: Types.ObjectId, userId: Types.ObjectId, Schema: any, body: any) => {
    return await Schema.updateOne({ _id: id, school_id: userId }, { $set: body }, { upsert: true, new: true })
}