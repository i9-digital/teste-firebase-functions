import { container } from "tsyringe";
import CreateUserService from "../app/modules/user/services/create-user-service";

container.register<CreateUserService>("CreateUserService", {
  useClass: CreateUserService,
});
