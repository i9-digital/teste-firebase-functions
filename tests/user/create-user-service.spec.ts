/* eslint-disable no-undef */
import CreateUserService from "../../src/app/modules/user/services/create-user-service";
import UserRepository from "../../src/app/modules/user/repository";

describe("Unit Tests Service", () => {
  const instanceRepository = new UserRepository();
  const instanceService = new CreateUserService(instanceRepository);
  const name = "Carlos";

  it("should create a new user", async () => {
    jest
      .spyOn(instanceRepository, "create")
      .mockResolvedValue({ id: "1", name: "Carlos" });
    const response = await instanceService.execute({ name });
    expect(response).toBeDefined();
    expect(response).toEqual({ id: "1", name: "Carlos" });
  });

  it("should return an error if the insertion goes wrong", async () => {
    jest
      .spyOn(instanceRepository, "create")
      .mockRejectedValue({ error: "error in firebase" });
    await expect(instanceService.execute({ name })).rejects.toThrow(
      "error when trying to register user"
    );
  });
});
