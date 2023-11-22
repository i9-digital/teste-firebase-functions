/* eslint-disable no-undef */
import request from "supertest";
import app from "../../src/app";

describe("Automated Tests", () => {
  it("should register a name successfully", async () => {
    const name = "Carlos Felipe";
    const response = await request(app).post("/users").send({
      name,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(name);
  });
});
