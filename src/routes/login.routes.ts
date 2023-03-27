import { Router } from "express"
import { Login } from "../controllers/auth.controller"

export default (router: Router) => {
    router.get('/login', Login)
}