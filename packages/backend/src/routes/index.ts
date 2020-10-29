import { Router } from 'express';

import UsersRoute from './users';
import PostsRoute from './posts';
import SessionsRoute from './sessions';
import FollowsRoute from './follows';
import GroupsRoute from './groups';

const routes = Router();

routes.use('/users', UsersRoute);
routes.use('/posts', PostsRoute);
routes.use('/sessions', SessionsRoute);
routes.use('/follows', FollowsRoute);
routes.use('/groups', GroupsRoute);

export default routes;
