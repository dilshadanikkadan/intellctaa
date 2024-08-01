import request from "supertest";
import app from "../../presentation/application";


it('returns 200 if credential ok with login',async()=>{
    await request(app)
    .post("/signup")
    .send({
      username: "dilshad",
      email: "dilshad786@gmail.com",
      password: "dilshad4321@",
      otp: "3312",
    })
    .expect(200)

    await request(app).post('/login').send({
        email: "dilshad786@gmail.com",
        password: "dilshad4321@",
    }).expect(200)
})

it('returns 400 if invalid password',async()=>{
    await request(app)
    .post("/signup")
    .send({
      username: "dilshad",
      email: "dilshad786@gmail.com",
      password: "dilshad4321@",
      otp: "3312",
    })
    .expect(200)

    await request(app).post('/login').send({
        email: "dilshad786@gmail.com",
        password: "dilshad4321",
    }).expect(400)
})

it('returns 400 if user is not exist',async()=>{
    await request(app)
    .post("/signup")
    .send({
      username: "dilshad",
      email: "dilshad786@gmail.com",
      password: "dilshad4321@",
      otp: "3312",
    })
    .expect(200)

    await request(app).post('/login').send({
        email: "dilshad78@gmail.com",
        password: "dilshad4321",
    }).expect(400)
})