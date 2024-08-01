"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookController = void 0;
const config_1 = require("@/_boot/config");
const Session_1 = require("@/infrastructure/database/mongo/models/Session");
const userCreated_1 = __importStar(require("@/infrastructure/kafka/producer/userCreated"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(config_1.config.secrets.stripe_key, {
    apiVersion: "2024-06-20",
});
const webhookController = (dependencies) => {
    const { useCases: { webHookUseCase }, } = dependencies;
    return async (req, res, next) => {
        const stripeSignature = req.headers["stripe-signature"];
        if (stripeSignature == null) {
            throw new Error("No stripe signature found!");
        }
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, stripeSignature?.toString(), config_1.config.secrets.web_hook_url);
        }
        catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;
                console.log("Payment successful:&&&&&&&&&&&&&&&&&&&&&&&", session);
                const savedPayment = await webHookUseCase(dependencies).execute({
                    id: session.id,
                });
                const instructor = await Session_1.Session.findOne({ sessionId: session.id });
                userCreated_1.default.produceAll({
                    payload: {
                        ...savedPayment,
                        instructor: instructor?.instructor,
                    },
                }, (0, userCreated_1.paymentSuccessBatch)({
                    ...savedPayment?._doc,
                    instructor: instructor?.instructor,
                }));
                console.log("_______________________________________dilshad this is paymenth");
                console.log(instructor);
                console.log("_______________5555555555555________________________");
                console.log({
                    ...savedPayment,
                    instructor: instructor?.instructor,
                });
                console.log("_______________________________________");
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.json();
    };
};
exports.webhookController = webhookController;
