import { Router } from "express";

import UsersRoute from "./users";
import PostsRoute from "./posts";
import SessionsRoute from "./sessions";

const routes = Router();

routes.use("/users", UsersRoute);
routes.use("/posts", PostsRoute);
routes.use("/sessions", SessionsRoute);

export default routes;
