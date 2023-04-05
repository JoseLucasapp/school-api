import "dotenv/config"

import './config/db.config'
import routes from "./routes"
import express, { Request, Response } from "express"
import cors from "cors"
import { rateLimit } from "express-rate-limit"

const app = express()
const route = express.Router()
const PORT = process.env.PORT
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later"
})

app.use(express.json())
app.use(cors())
app.use(limiter)
app.use('/api', route)
routes(route)

route.get('/', (req: Request, res: Response): void => {
    res.send('<h1>Home Page</h1>')
})

app.listen(PORT)