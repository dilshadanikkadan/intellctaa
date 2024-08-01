import request from "supertest";
import app from "../../presentation/application";

it("returns 200 if create instructor got success", async () => {

  await request(app)
    .post("/signup")
    .send({
      username: "dilshad",
      email: "dilshad786@gmail.com",
      password: "dilshad4321@",
      otp: "3312",
    })
    .expect(200)


  await request(app)
    .put("/createInstructor")
    .send({
      email:"dilshad786@gmail.com"
    })
    .expect(200)
    .then((res) => {
      expect(res.body.isInstructor).toBeTruthy()
    });
});
