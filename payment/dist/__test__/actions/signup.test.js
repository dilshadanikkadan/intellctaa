"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const application_1 = __importDefault(require("../../presentation/application"));
it('returns a 201 payload when successfull signup', async () => {
    return (0, supertest_1.default)(application_1.default).post('/signup').send({
        username: "dilshad",
        email: "dilshad786@gmail.com",
        password: "dilshad4321@"
    }).expect(200);
});
it('returns a 400 palyload with invalid email ', async () => {
    return (0, supertest_1.default)(application_1.default).post('/signup').send({
        username: "dilshad",
        email: "%%%g#gmd.com",
        password: "dilshad4321"
    }).expect(400);
});
it('returns a 400 palyload with password validation ', async () => {
    return (0, supertest_1.default)(application_1.default).post('/signup').send({
        username: "dilshad",
        email: "dilu@gmail.com",
        password: "3"
    }).expect(400);
});
it("return 400 if email find duplicated", async () => {
    await (0, supertest_1.default)(application_1.default).post('/signup').send({
        username: "dilshad",
        email: "dilshad786@gmail.com",
        password: "dilshad4321@",
        isVerified: true
    }).expect(200);
    await (0, supertest_1.default)(application_1.default).post('/signup').send({
        username: "dilshad",
        email: "dilshad786@gmail.com",
        password: "dilshad4321@"
    }).expect(400);
});
