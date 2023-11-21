type User = {
  name: string;
};

export interface IUserCreateResponse extends User {
  id: string;
}

export interface IUserServiceRequest extends User {}

export interface IUserRepositoryParams extends User {}

export interface IUserRepository {
  create(data: IUserRepositoryParams): Promise<IUserCreateResponse>;
}

export interface ICreateUserService {
  execute(data: IUserServiceRequest): Promise<IUserCreateResponse | void>;
}
