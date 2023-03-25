import { Router } from "express";
import loginRoute from "./login.route";

export default (router: Router) => {
    loginRoute(router)
}