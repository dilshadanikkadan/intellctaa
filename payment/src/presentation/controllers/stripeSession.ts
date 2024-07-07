import { config } from "@/_boot/config";
import { IDependencies } from "@/application/interfaces/IDependencies";
import Stripe from "stripe";

export const stripeSessionController = (dependencies: IDependencies) => {
  const {
    useCases: { stripeSessionUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const stripe = new Stripe(config.secrets.stripe_key, {
        apiVersion: "2024-04-10",
      } as any);

      console.log("++++++++++++++++++++++++++++++++++++++++");
      console.log(req.body);
      console.log("++++++++++++++++++++++++++++++++++++++++");

      const { courseTitle, courseThumbnail, courseMode,userId, courseId, amount }: any = req.body;

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
        success_url: `${config.secrets.front_end_url}/courses/${courseId}/purchase/success`,
        cancel_url: `${config.secrets.front_end_url}/courses/${courseId}`,
      });

      const result = await stripeSessionUseCase(dependencies).execute({
        userId,
        courseId,
        sessionId: session.id,
        amount,
        courseMode,
      });

      res.status(200).json({
        success: true,
        data: result,
        message: "Session created!" ,
      });
    } catch (error) {
      next(error);
    }
  };
};

