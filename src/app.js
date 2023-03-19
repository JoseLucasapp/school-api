import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"

const app = express()
const route = express.Router()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cors())
app.use('/api', route)

route.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

app.listen(PORT)