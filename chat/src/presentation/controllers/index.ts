import { IDependencies } from "@/application/interfaces/IDependencies";
import { createUserController } from "./createUser";
import { stripeSessionController } from "./stripeSession";
import { webhookController } from "./webhook";


export const controllers = (dependencies: IDependencies) => {
    return {
        creatUser: createUserController(dependencies),
         createSession:stripeSessionController(dependencies),
         webHook:webhookController(dependencies)
    }
};