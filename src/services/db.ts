export const create = async (body: any, Schema: any) => {
    const newData = new Schema(body)
    return await newData.save()
}

export const getById = async (id: string, Schema: any, school_id?: string) => {
    return await Schema.findOne({ _id: id, school_id })
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

export const remove = async (id: string, Schema: any, school_id?: string) => {
    return await Schema.deleteOne({ _id: id, school_id })
}

export const update = async (id: string, Schema: any, body: any, school_id?: string) => {
    return await Schema.updateOne({ _id: id, school_id }, { $set: body }, { upsert: true, new: true })
}

export const checkEmail = async (userEmail: string, Schema: any) => {
    const emailData = await Schema.findOne({ email: userEmail }).select('email')
    if (emailData) {
        return true
    }
    return false
}

export const randomCheck = async (body: any, select: string, Schema: any) => {
    return await Schema.findOne(body).select(select)
}