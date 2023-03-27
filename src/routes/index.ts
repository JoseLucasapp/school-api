import { Router } from "express";
import loginRoute from "./login.routes";
import schoolRoutes from "./school.routes";

export default (router: Router) => {
    loginRoute(router)
    schoolRoutes(router)
}