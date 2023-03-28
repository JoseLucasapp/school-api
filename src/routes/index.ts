import { Router } from "express";
import classroomsRoutes from "./classrooms.routes";
import loginRoute from "./login.routes";
import schoolRoutes from "./school.routes";
import workerRoutes from "./worker.routes";

export default (router: Router) => {
    loginRoute(router)
    schoolRoutes(router)
    workerRoutes(router)
    classroomsRoutes(router)
}