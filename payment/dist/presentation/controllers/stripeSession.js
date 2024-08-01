"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeSessionController = void 0;
const config_1 = require("@/_boot/config");
const stripe_1 = __importDefault(require("stripe"));
const stripeSessionController = (dependencies) => {
    const { useCases: { stripeSessionUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const stripe = new stripe_1.default(config_1.config.secrets.stripe_key, {
                apiVersion: "2024-04-10",
            });
            console.log("++++++++++++++++++++++++++++++++++++++++");
            console.log(req.body);
            console.log("++++++++++++++++++++++++++++++++++++++++");
            const { courseTitle, courseThumbnail, courseMode, userId, courseId, amount, instructor } = req.body;
            if (isNaN(amount)) {
                throw new Error("Invalid amount value");
            }
            console.log(`Amount: ${amount}`);
            const stripeData = [
                {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: courseTitle,
                            images: [courseThumbnail],
                        },
                        unit_amount: Math.floor(amount * 100),
                    },
                    quantity: 1,
                },
            ];
            const session = await stripe.checkout?.sessions.create({
                payment_method_types: ["card"],
                line_items: stripeData,
                mode: "payment",
                success_url: `${config_1.config.secrets.front_end_url}/courses/${courseId}/purchase/success`,
                cancel_url: `${config_1.config.secrets.front_end_url}/courses/${courseId}`,
            });
            const result = await stripeSessionUseCase(dependencies).execute({
                userId,
                courseId,
                sessionId: session.id,
                amount,
                courseMode,
                instructor
            });
            res.status(200).json({
                success: true,
                data: result,
                message: "Session created!",
            });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.stripeSessionController = stripeSessionController;
