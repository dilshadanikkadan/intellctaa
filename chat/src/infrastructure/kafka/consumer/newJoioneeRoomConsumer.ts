import { joinToGroup } from "@/infrastructure/database/mongo/repositories/usesr/joinToGroup";

export const newJoinRoom = async (payload: any) => {
  try {
    await joinToGroup(payload);
  } catch (error) {}
};
