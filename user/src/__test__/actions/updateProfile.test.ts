import request from "supertest";
import app from "../../presentation/application";

it("returns 200 if get all user", async () => {
  let userId;
  await request(app)
    .post("/signup")
    .send({
      username: "dilshad",
      email: "dilshad786@gmail.com",
      password: "dilshad4321@",
      otp: "3312",
    })
    .expect(200)
    .then((res) => {
      userId = res.body._id;
    });

  await request(app)
    .put("/updateProfile")
    .send({
      username: "dilu",
      userId,
    })
    .expect(200)
    .then((res) => {
      expect(res.body.username).toEqual('dilu')
    });
});
