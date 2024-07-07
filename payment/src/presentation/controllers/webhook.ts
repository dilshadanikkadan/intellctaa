import { config } from "@/_boot/config";
import { IDependencies } from "@/application/interfaces/IDependencies";
import userCreated, { paymentSuccessBatch } from "@/infrastructure/kafka/producer/userCreated";
import { NextFunction, Response } from "express";
import Stripe  from "stripe";
const stripe = new Stripe(config.secrets.stripe_key as string, {
    apiVersion: "2024-06-20",
  });

export const webhookController = (dependencies: IDependencies) => {
const {useCases:{webHookUseCase}} = dependencies;
    return async (req: any, res: Response, next: NextFunction) => {
        const stripeSignature = req.headers["stripe-signature"];
        if (stripeSignature == null) {
          throw new Error("No stripe signature found!");
        }
        let event: Stripe.Event;
    
        try {
          event = stripe.webhooks.constructEvent(
            req.body,
            stripeSignature?.toString(),
            config.secrets.web_hook_url,
          );
        } catch (err) {
          res.status(400).send(`Webhook Error: ${(err as Error).message}`);
          return;
        }
        switch (event.type) {
          case "checkout.session.completed":
        
          const session = event.data.object;
    
          console.log('Payment successful:', session);
          const savedPayment= await webHookUseCase(dependencies).execute({id:session.id})
          userCreated.produceAll(
            { payload: savedPayment },
            paymentSuccessBatch(savedPayment)
          );
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
        res.json();
      };
}