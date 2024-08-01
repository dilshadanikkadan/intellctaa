"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const application_1 = __importDefault(require("../../presentation/application"));
let otp;
it("it return 200 if otp ok ", async () => {
    await (0, supertest_1.default)(application_1.default)
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
    await (0, supertest_1.default)(application_1.default)
        .post("/verifyOtp")
        .send({
        email: "dilshad786@gmail.com",
        otp: otp,
    })
        .expect(200)
        .then((res) => {
        accesstoken = res.headers["set-cookie"];
    });
    expect(accesstoken).toBeDefined();
});
it("it return 400 for invalid otp ", async () => {
    await (0, supertest_1.default)(application_1.default)
        .post("/signup")
        .send({
        username: "dilshad",
        email: "dilshad786@gmail.com",
        password: "dilshad4321@",
    })
        .expect(200)
        .then((res) => {
    });
    await (0, supertest_1.default)(application_1.default)
        .post("/verifyOtp")
        .send({
        email: "dilshad786@gmail.com",
        otp: "8895",
    })
        .expect(400)
        .then((res) => {
    });
});
