import { Router } from "express";
import CreateUserController from "../app/modules/user/controllers/create-user-controller";
import CreateUserService from "../app/modules/user/services/create-user-service";
import UserRepository from "../app/modules/user/repository";

const userRouter = Router();

const instanceController = new CreateUserController(
  new CreateUserService(new UserRepository())
);

userRouter.post("/users", instanceController.handle);

export default userRouter;
