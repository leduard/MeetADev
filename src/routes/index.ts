import { Router } from "express";

import UsersRoute from "./users";

const routes = Router();

routes.use(UsersRoute);

export default routes;
