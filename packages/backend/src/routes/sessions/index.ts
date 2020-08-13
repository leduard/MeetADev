import { Router } from "express";

import CreateSessionService from "../../app/services/CreateSessionService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.execute({
      username,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
