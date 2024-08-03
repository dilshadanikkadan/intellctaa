"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dependencies_1 = require("@/_boot/dependencies");
const routes_1 = require("@/infrastructure/routes");
const common_1 = require("@intellectaa/common");
const socket_handler_1 = require("@/infrastructure/socketHandler/socket.handler");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, routes_1.routes)(dependencies_1.dependencies));
app.use((0, cors_1.default)(corsOptions));
app.use(common_1.errorHandler);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "chat service ON!",
    });
});
const server = http_1.default.createServer(app);
(0, socket_handler_1.sockerHandler)(server);
exports.default = server;