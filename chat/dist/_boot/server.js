"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@/_boot/config");
exports.default = async (app) => {
    app.listen(config_1.config.http.port, () => {
        console.log('786........✨✨✨');
        console.log(`⚡  User_Service is listening at ${config_1.config.http.port}`);
    });
};
