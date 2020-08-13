import { Router } from "express";

import UsersRoute from "./users";
import PostsRoute from "./posts";
import SessionsRoute from "./sessions";
import FollowsRoute from "./follows";

const routes = Router();

routes.use("/users", UsersRoute);
routes.use("/posts", PostsRoute);
routes.use("/sessions", SessionsRoute);
routes.use("/follows", FollowsRoute);

export default routes;
