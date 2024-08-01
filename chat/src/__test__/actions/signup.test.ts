import request from 'supertest';
import app from "../../presentation/application";

it('returns a 201 payload when successfull signup',async()=>{
    return request(app).post('/signup').send({
        username:"dilshad",
        email:"dilshad786@gmail.com",
        password:"dilshad4321@"
    }).expect(200)
}) 

it('returns a 400 palyload with invalid email ',async()=>{
    return request(app).post('/signup').send({
        username:"dilshad",
        email:"%%%g#gmd.com",
        password:"dilshad4321"
    }).expect(400)
})

it('returns a 400 palyload with password validation ',async()=>{
    return request(app).post('/signup').send({
        username:"dilshad",
        email:"dilu@gmail.com",
        password:"3"
    }).expect(400)
})


it("return 400 if email find duplicated",async()=>{
    await request(app).post('/signup').send({
        username:"dilshad",
        email:"dilshad786@gmail.com",
        password:"dilshad4321@",
        isVerified:true
    }).expect(200)

    await request(app).post('/signup').send({
        username:"dilshad",
        email:"dilshad786@gmail.com",
        password:"dilshad4321@"
    }).expect(400)

})