import { pyamentUpdate } from "@/infrastructure/database/mongo/repositories/usesr/paymentUpdate";

export const paymentConsumer = async (payload: any) => {
  try {
    await pyamentUpdate(payload);
  } catch (error) {}
};
