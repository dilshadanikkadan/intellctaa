"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const application_1 = __importDefault(require("../../presentation/application"));
it("returns 200 if block user", async () => {
    await (0, supertest_1.default)(application_1.default)
        .post("/signup")
        .send({
        username: "dilshad",
        email: "dilshad786@gmail.com",
        password: "dilshad4321@",
        otp: "3312",
    })
        .expect(200);
    await (0, supertest_1.default)(application_1.default)
        .put("/blockUser")
        .send({
        email: "dilshad786@gmail.com"
    })
        .expect(200)
        .then((res) => {
        expect(res.body.isBlocked).toBeTruthy();
    });
});
