import { pyamentUpdateAuth } from "@/infrastructure/database/mongo/repositories/usesr/paymentSuccess";

export const paymentConsumer = async (payload: any) => {
  try {
    await pyamentUpdateAuth(payload);
  } catch (error) {}
};
