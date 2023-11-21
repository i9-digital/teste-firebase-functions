import db from "../../../../config/database/firebase/db";
import {
  IUserCreateResponse,
  IUserRepository,
  IUserRepositoryParams,
} from "../interfaces/user-interfaces";

export default class UserRepository implements IUserRepository {
  async create({ name }: IUserRepositoryParams): Promise<IUserCreateResponse> {
    const userCollection = db().collection("users");
    const nextId = (await userCollection.get()).size + 1;
    const id = String(nextId);
    const reference = userCollection.doc(id);
    await reference.set({ name });
    const response = {
      id,
      name,
    };
    return response;
  }
}
