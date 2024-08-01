import request from "supertest";
import app from "../../presentation/application";
let otp;
it("it return 200 if otp ok ", async () => {
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
      otp = res.body.otp;
    });
    let accesstoken;
  await request(app)
    .post("/verifyOtp")
    .send({
      email: "dilshad786@gmail.com",
      otp: otp,
    })
    .expect(200)
    .then((res) => {
        accesstoken = res.headers["set-cookie"];
    });
    expect(accesstoken).toBeDefined()
});


it("it return 400 for invalid otp ", async () => {
    await request(app)
      .post("/signup")
      .send({
        username: "dilshad",
        email: "dilshad786@gmail.com",
        password: "dilshad4321@",
      })
      .expect(200)
      .then((res) => {
       
      });
  
    await request(app)
      .post("/verifyOtp")
      .send({
        email: "dilshad786@gmail.com",
        otp: "8895",
      })
      .expect(400)
      .then((res) => {
      });
  });
  