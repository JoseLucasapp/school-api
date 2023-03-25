import "dotenv/config"

import './config/db.config'
import routes from "./routes"
import express, { Request, Response } from "express"
import cors from "cors"

const app = express()
const route = express.Router()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/api', route)
routes(route)

route.get('/', (req: Request, res: Response): void => {
    res.send('<h1>Home Page</h1>')
})

app.listen(PORT)