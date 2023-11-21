import { ServiceError } from "../../../../config/error";
import logger from "../../../../config/logger";
import {
  IUserCreateResponse,
  IUserRepository,
  ICreateUserService,
  IUserServiceRequest,
} from "../interfaces/user-interfaces";

export default class CreateUserService implements ICreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    name,
  }: IUserServiceRequest): Promise<IUserCreateResponse | void> {
    try {
      logger.info(
        "SERVICE-START: [CreateUserService] - Trying to register user"
      );

      const response = await this.userRepository.create({
        name,
      });

      logger.info(
        "SERVICE-END: [CreateUserService] - User successfully registered."
      );
      return response;
    } catch (err: any) {
      const errorMessage = "error when trying to register user";
      logger.error(`SERVICE-ERROR: [CreateUserService] - ${errorMessage}`, err);
      throw new ServiceError(errorMessage);
    }
  }
}
