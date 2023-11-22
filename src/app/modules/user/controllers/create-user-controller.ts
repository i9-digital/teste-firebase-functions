/* eslint-disable no-useless-constructor */
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import logger from "../../../../config/logger";
import { StatusCodes } from "../../../../enums/status-code";
import { ICreateUserService } from "../interfaces/user-interfaces";

@injectable()
export default class CreateUserController {
  public constructor(
    @inject("CreateUserService")
    private createUserService: ICreateUserService
  ) {}

  handle = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    logger.info("[CreateUserController]::: Trying to register user");

    try {
      const { name } = request.body;

      const userResponse = await this.createUserService.execute({ name });

      response.status(StatusCodes.OK).json(userResponse);
      return next();
    } catch (error: any) {
      return next(error);
    }
  };
}
