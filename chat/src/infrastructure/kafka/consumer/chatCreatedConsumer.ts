import { createRoom } from "@/infrastructure/database/mongo/repositories/usesr";

export const chatCreatedConsumer = async (payload: any) => {
  try {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", payload);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

    await createRoom(payload);
  } catch (error) {
    console.log(error);
  }
};
