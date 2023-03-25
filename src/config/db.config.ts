import "dotenv/config"
import mongoose from 'mongoose'

const MONGO_URL: string = (process.env.MONGO_URL as string);

export default mongoose.connect(MONGO_URL)

