import { Payment } from "../../models/Payment";
import { Session } from "../../models/Session";

export const webHook = async (payload: any) => {
    const {id} = payload;
    const session= await Session.findOne({sessionId:id});

    const newPayment=new Payment({
        userId:session?.userId,
        amount:session?.amount,
        courseId:session?.courseId,
        courseMode:session?.courseMode,
        status:"completed"
    })

    return await newPayment.save()
};
